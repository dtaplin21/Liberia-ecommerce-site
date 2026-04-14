"""Helpers for Stripe Checkout Session objects (webhook payload)."""
from typing import Any, Mapping


def customer_email_from_session(session: Mapping[str, Any]) -> str:
    """
    Stripe may put the payer email on customer_email, customer_details.email,
    or checkout metadata depending on flow and API version.
    """
    metadata = session.get("metadata") or {}
    details = session.get("customer_details") or {}
    if not isinstance(details, dict):
        details = {}
    raw = (
        session.get("customer_email")
        or details.get("email")
        or metadata.get("customer_email")
        or ""
    )
    return str(raw).strip()
