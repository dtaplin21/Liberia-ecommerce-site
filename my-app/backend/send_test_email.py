#!/usr/bin/env python3
"""
Minimal SendGrid send — verify API key + sender before relying on webhooks.
Usage (from backend/):  python send_test_email.py

Requires in .env: SENDGRID_API_KEY, EMAIL_FROM
Recipient: TEST_EMAIL_TO if set, else MERCHANT_EMAIL
Optional: SENDGRID_DATA_RESIDENCY=eu
"""
import os
import sys
from pathlib import Path
from urllib.error import URLError

from dotenv import load_dotenv
from python_http_client import exceptions as http_client_exceptions
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

load_dotenv(Path(__file__).resolve().parent / ".env")

api_key = (os.getenv("SENDGRID_API_KEY") or "").strip()
from_email = (os.getenv("EMAIL_FROM") or "").strip()
to_email = (os.getenv("TEST_EMAIL_TO") or os.getenv("MERCHANT_EMAIL") or "").strip()

if not api_key or not from_email or not to_email:
    print(
        "Missing env. Set in backend/.env:\n"
        "  SENDGRID_API_KEY\n"
        "  EMAIL_FROM (verified sender in SendGrid)\n"
        "  TEST_EMAIL_TO  or MERCHANT_EMAIL  (where to send the test)\n"
    )
    sys.exit(1)

client = SendGridAPIClient(api_key)
if (os.getenv("SENDGRID_DATA_RESIDENCY") or "").strip().lower() == "eu":
    client.set_sendgrid_data_residency("eu")

message = Mail(
    from_email=from_email,
    to_emails=to_email,
    subject="SendGrid test — The Unnamed Farm",
    plain_text_content=(
        "If you receive this message, SendGrid Web API is configured correctly.\n"
    ),
)

try:
    response = client.send(message)
    print(f"SendGrid status: {response.status_code}")
    print(f"Sent to: {to_email}")
except http_client_exceptions.HTTPError as e:
    print(f"SendGrid HTTP error: {e.status_code}\n{e.body}")
    sys.exit(1)
except URLError as e:
    print(f"Network/SSL error calling SendGrid: {e.reason or e}")
    print(
        "On macOS with python.org Python, run: Install Certificates.command "
        "(in the Python folder in Applications), then try again."
    )
    sys.exit(1)
