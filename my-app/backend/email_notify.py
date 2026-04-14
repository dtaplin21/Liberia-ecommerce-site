"""SMTP order notifications triggered from the Stripe webhook (best-effort)."""
import os
import smtplib
from email.message import EmailMessage
from typing import Any, Mapping


def _meta(metadata: Mapping[str, Any] | None, key: str, default: str = "") -> str:
    if not metadata:
        return default
    v = metadata.get(key)
    if v is None:
        return default
    return str(v)


def _send(msg: EmailMessage) -> None:
    host = os.getenv("SMTP_HOST", "").strip()
    if not host:
        raise RuntimeError("SMTP_HOST is not set")

    port = int(os.getenv("SMTP_PORT", "587"))
    user = (os.getenv("SMTP_USER") or "").strip()
    password = os.getenv("SMTP_PASSWORD") or ""
    use_ssl = os.getenv("SMTP_SSL", "").lower() in ("1", "true", "yes") or port == 465

    if use_ssl:
        with smtplib.SMTP_SSL(host, port, timeout=30) as server:
            if user:
                server.login(user, password)
            server.send_message(msg)
    else:
        with smtplib.SMTP(host, port, timeout=30) as server:
            server.starttls()
            if user:
                server.login(user, password)
            server.send_message(msg)


def send_checkout_confirmation_emails(session: Mapping[str, Any]) -> None:
    """
    Email the buyer and merchant after checkout.session.completed.
    Skips silently if SMTP/EMAIL_FROM are not configured (logs one line).
    """
    from_addr = (os.getenv("EMAIL_FROM") or "").strip()
    if not from_addr:
        print("EMAIL: EMAIL_FROM not set; skipping order confirmation emails")
        return

    if not (os.getenv("SMTP_HOST") or "").strip():
        print("EMAIL: SMTP_HOST not set; skipping order confirmation emails")
        return

    metadata = session.get("metadata") or {}
    customer_email = (session.get("customer_email") or _meta(metadata, "customer_email")).strip()
    customer_name = _meta(metadata, "customer_name", "Customer")
    quantity = _meta(metadata, "quantity", "1")
    product = _meta(metadata, "product", "Divine Lumina Cocoa Butter")
    address = _meta(metadata, "customer_address")
    city = _meta(metadata, "customer_city")
    state = _meta(metadata, "customer_state")
    z = _meta(metadata, "customer_zip")

    amount_cents = session.get("amount_total") or 0
    try:
        amount_cents = int(amount_cents)
    except (TypeError, ValueError):
        amount_cents = 0
    currency = (session.get("currency") or "usd").upper()
    amount_str = f"{amount_cents / 100:.2f} {currency}"

    session_id = session.get("id", "")
    ship_lines = [ln for ln in (address, f"{city}, {state} {z}".strip(", ").strip()) if ln]

    buyer_body = (
        f"Hi {customer_name},\n\n"
        f"Thank you for your purchase from The Unnamed Farm.\n\n"
        f"Order summary\n"
        f"-------------\n"
        f"Product: {product}\n"
        f"Quantity: {quantity}\n"
        f"Total paid: {amount_str}\n"
        f"Stripe session: {session_id}\n"
    )
    if ship_lines:
        buyer_body += "\nShipping address:\n" + "\n".join(ship_lines) + "\n"
    buyer_body += (
        "\nWe'll follow up with shipping details as your order is fulfilled.\n\n"
        "— The Unnamed Farm\n"
    )

    merchant_to = (os.getenv("MERCHANT_EMAIL") or "").strip()
    merchant_body = (
        f"New paid order (Stripe Checkout)\n"
        f"--------------------------------\n"
        f"Session ID: {session_id}\n"
        f"Customer: {customer_name} <{customer_email or 'no email on session'}>\n"
        f"Product: {product}\n"
        f"Quantity: {quantity}\n"
        f"Total: {amount_str}\n"
    )
    if ship_lines:
        merchant_body += "\nShip to:\n" + "\n".join(ship_lines) + "\n"

    if customer_email:
        buyer_msg = EmailMessage()
        buyer_msg["Subject"] = "Order confirmation — The Unnamed Farm"
        buyer_msg["From"] = from_addr
        buyer_msg["To"] = customer_email
        buyer_msg.set_content(buyer_body)
        _send(buyer_msg)
        print(f"EMAIL: sent buyer confirmation to {customer_email}")
    else:
        print("EMAIL: no customer_email on session; skipped buyer email")

    if merchant_to:
        merch_msg = EmailMessage()
        merch_msg["Subject"] = f"New order: {customer_name or 'Customer'} — {amount_str}"
        merch_msg["From"] = from_addr
        merch_msg["To"] = merchant_to
        merch_msg.set_content(merchant_body)
        _send(merch_msg)
        print(f"EMAIL: sent merchant notification to {merchant_to}")
    else:
        print("EMAIL: MERCHANT_EMAIL not set; skipped seller notification")
