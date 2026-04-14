"""SendGrid Web API order notifications (Stripe webhook → checkout.session.completed)."""
import os
from typing import Any, Mapping

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from python_http_client import exceptions as http_client_exceptions


def _meta(metadata: Mapping[str, Any] | None, key: str, default: str = "") -> str:
    if not metadata:
        return default
    v = metadata.get(key)
    if v is None:
        return default
    return str(v)


def _send_email(
    client: SendGridAPIClient,
    from_email: str,
    to_email: str,
    subject: str,
    plain_text: str,
) -> None:
    message = Mail(
        from_email=from_email,
        to_emails=to_email,
        subject=subject,
        plain_text_content=plain_text,
    )
    response = client.send(message)
    if response.status_code not in (200, 201, 202):
        raise RuntimeError(
            f"SendGrid returned status {response.status_code}: {response.body}"
        )


def send_checkout_confirmation_emails(session: Mapping[str, Any]) -> None:
    """
    Email the buyer and merchant after checkout.session.completed.
    Skips if SENDGRID_API_KEY or EMAIL_FROM are not configured.
    """
    api_key = (os.getenv("SENDGRID_API_KEY") or "").strip()
    from_addr = (os.getenv("EMAIL_FROM") or "").strip()

    if not api_key:
        print("EMAIL: SENDGRID_API_KEY not set; skipping order confirmation emails")
        return
    if not from_addr:
        print("EMAIL: EMAIL_FROM not set; skipping order confirmation emails")
        return

    client = SendGridAPIClient(api_key)
    # EU Data Residency → https://api.eu.sendgrid.com (EU-pinned subuser + key required)
    # https://www.twilio.com/docs/sendgrid/data-residency
    if (os.getenv("SENDGRID_DATA_RESIDENCY") or "").strip().lower() == "eu":
        client.set_sendgrid_data_residency("eu")

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

    try:
        if customer_email:
            _send_email(
                client,
                from_addr,
                customer_email,
                "Order confirmation — The Unnamed Farm",
                buyer_body,
            )
            print(f"EMAIL: sent buyer confirmation to {customer_email}")
        else:
            print("EMAIL: no customer_email on session; skipped buyer email")

        if merchant_to:
            _send_email(
                client,
                from_addr,
                merchant_to,
                f"New order: {customer_name or 'Customer'} — {amount_str}",
                merchant_body,
            )
            print(f"EMAIL: sent merchant notification to {merchant_to}")
        else:
            print("EMAIL: MERCHANT_EMAIL not set; skipped seller notification")
    except http_client_exceptions.HTTPError as e:
        raise RuntimeError(f"SendGrid API error: {e.status_code} — {e.body}") from e
