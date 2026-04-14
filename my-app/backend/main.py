from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from pydantic import BaseModel
from datetime import datetime
import os
import stripe
from database import connect_to_db
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv
from email_notify import send_checkout_confirmation_emails
from stripe_checkout_utils import customer_email_from_session

load_dotenv()

# Initialize Stripe (secret key must be in backend/.env — see env.example)
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
if not stripe.api_key:
    print(
        "WARNING: STRIPE_SECRET_KEY is not set. Copy backend/env.example to backend/.env "
        "and add your Stripe test secret key (sk_test_...)."
    )

class Product(BaseModel):
    id: int
    name: str
    price: int
    inventory: int
    created_at: datetime

    class Config:
        from_attributes = True

class PaymentIntentRequest(BaseModel):
    amount: int  # Amount in cents
    currency: str = "usd"
    metadata: dict = {}

class CheckoutSessionRequest(BaseModel):
    amount: int  # Amount in cents
    currency: str = "usd"
    customer_email: str
    customer_name: str
    quantity: int
    donation: float = 0.0  # Donation amount in dollars
    customer_address: str = ""
    customer_city: str = ""
    customer_state: str = ""
    customer_zip: str = ""
    success_url: str
    cancel_url: str

app = FastAPI()

# Add CORS middleware to allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root(): 
    return {"Fastapi works"}

@app.get("/products", response_model=list[Product])
def get_products():
    conn = None
    try:
        conn = connect_to_db()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute('SELECT id, "Name" as name, "Price" as price, inventory, created_at FROM public."Products" ORDER BY id ASC')
        products = cursor.fetchall()
        return products
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn:
            cursor.close()
            conn.close()

@app.get("/stats")
def get_stats():
    conn = None
    try:
        conn = connect_to_db()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        # Get total proceeds and total jars sold from completed orders
        cursor.execute("""
            SELECT 
                COALESCE(SUM(total_amount), 0) as total_proceeds,
                COALESCE(SUM(quantity), 0) as total_jars_sold,
                COUNT(*) as total_orders
            FROM Orders
            WHERE status = 'completed'
        """)
        
        stats = cursor.fetchone()
        return {
            "total_proceeds": float(stats['total_proceeds']) if stats['total_proceeds'] else 0,
            "total_jars_sold": int(stats['total_jars_sold']) if stats['total_jars_sold'] else 0,
            "total_orders": int(stats['total_orders']) if stats['total_orders'] else 0
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn:
            cursor.close()
            conn.close()

# Payment Intent Endpoint
@app.post("/create-payment-intent")
async def create_payment_intent(request: PaymentIntentRequest):
    try:
        # Create PaymentIntent with Stripe
        intent = stripe.PaymentIntent.create(
            amount=request.amount,
            currency=request.currency,
            metadata=request.metadata,
            automatic_payment_methods={
                "enabled": True,
            },
        )
        return {
            "clientSecret": intent.client_secret,
            "paymentIntentId": intent.id
        }
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Checkout Session Endpoint
@app.post("/create-checkout-session")
async def create_checkout_session(request: CheckoutSessionRequest):
    try:
        # Calculate unit price (total / quantity)
        unit_price = request.amount // request.quantity
        
        # Build metadata with all order details including donation and shipping
        metadata = {
            'customer_name': request.customer_name,
            'customer_email': request.customer_email,
            'quantity': str(request.quantity),
            'product': 'Divine Lumina Cocoa Butter',
            'donation': str(request.donation),
            'customer_address': request.customer_address,
            'customer_city': request.customer_city,
            'customer_state': request.customer_state,
            'customer_zip': request.customer_zip,
        }
        
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': request.currency,
                    'product_data': {
                        'name': 'Divine Lumina Cocoa Butter',
                        'description': 'Raw & Unrefined Cocoa Butter - 8 oz',
                    },
                    'unit_amount': unit_price,
                },
                'quantity': request.quantity,
            }],
            mode='payment',
            customer_email=request.customer_email,
            metadata=metadata,
            success_url=request.success_url + '?session_id={CHECKOUT_SESSION_ID}',
            cancel_url=request.cancel_url,
        )
        return {
            "sessionId": session.id,
            "url": session.url  # This is the Stripe Checkout URL
        }
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Helper function to save order to database from checkout session
def save_order_from_session(session):
    conn = None
    try:
        conn = connect_to_db()
        cursor = conn.cursor()
        
        # Extract order details from session metadata
        metadata = session.get('metadata', {})
        cust_email = customer_email_from_session(session)
        details = session.get('customer_details') or {}
        if not isinstance(details, dict):
            details = {}
        cust_name = (metadata.get('customer_name') or details.get('name') or '').strip()

        # Get amount_total from session (in cents) - this is the total paid
        amount_total = session.get('amount_total', 0) / 100  # Convert to dollars

        # Use session ID as unique identifier to prevent duplicates
        session_id = session.get('id')
        
        # Check if order already exists
        cursor.execute("""
            SELECT id FROM Orders WHERE stripe_payment_intent_id = %s
        """, (session_id,))
        
        if cursor.fetchone():
            print(f"Order already exists for session: {session_id}")
            cursor.close()
            return "duplicate"

        cursor.execute("""
            INSERT INTO Orders (
                stripe_payment_intent_id,
                customer_name,
                customer_email,
                customer_address,
                customer_city,
                customer_state,
                customer_zip,
                total_amount,
                quantity,
                product_name,
                status,
                created_at
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW())
        """, (
            session_id,
            cust_name,
            cust_email,
            metadata.get('customer_address', ''),
            metadata.get('customer_city', ''),
            metadata.get('customer_state', ''),
            metadata.get('customer_zip', ''),
            amount_total,
            int(metadata.get('quantity', 1)),
            metadata.get('product', 'Divine Lumina Cocoa Butter'),
            'completed'
        ))
        
        conn.commit()
        cursor.close()
        print(f"Order saved successfully for session: {session_id}")
        return "inserted"

    except Exception as e:
        print(f"Error saving order: {str(e)}")
        if conn:
            conn.rollback()
        return "error"
    finally:
        if conn:
            conn.close()

# Helper function to save order to database from payment intent (kept for backward compatibility)
def save_order_to_database(payment_intent):
    conn = None
    try:
        conn = connect_to_db()
        cursor = conn.cursor()
        
        # Extract order details from payment intent metadata
        metadata = payment_intent.get('metadata', {})
        
        cursor.execute("""
            INSERT INTO Orders (
                stripe_payment_intent_id,
                customer_name,
                customer_email,
                customer_address,
                customer_city,
                customer_state,
                customer_zip,
                total_amount,
                quantity,
                product_name,
                status,
                created_at
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW())
        """, (
            payment_intent['id'],
            metadata.get('customer_name', ''),
            metadata.get('customer_email', ''),
            metadata.get('customer_address', ''),
            metadata.get('customer_city', ''),
            metadata.get('customer_state', ''),
            metadata.get('customer_zip', ''),
            payment_intent['amount'] / 100,  # Convert cents to dollars
            int(metadata.get('quantity', 1)),
            metadata.get('product', ''),
            'completed'
        ))
        
        conn.commit()
        cursor.close()
        return True
        
    except Exception as e:
        print(f"Error saving order: {str(e)}")
        if conn:
            conn.rollback()
        return False
    finally:
        if conn:
            conn.close()

# Webhook endpoint for Stripe
@app.post("/webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")
    webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET")

    if not webhook_secret:
        print("WEBHOOK: STRIPE_WEBHOOK_SECRET is not set — cannot verify Stripe events")
        raise HTTPException(
            status_code=500,
            detail="Webhook not configured (missing STRIPE_WEBHOOK_SECRET)",
        )

    try:
        # Verify webhook signature
        event = stripe.Webhook.construct_event(
            payload, sig_header, webhook_secret
        )
    except ValueError as e:
        # Invalid payload
        raise HTTPException(status_code=400, detail=f"Invalid payload: {str(e)}")
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        raise HTTPException(status_code=400, detail=f"Invalid signature: {str(e)}")

    print(
        f"WEBHOOK: {event.get('type')} "
        f"evt={event.get('id')} "
        f"livemode={event.get('livemode')}"
    )

    # Handle the event
    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]

        # Save order to database directly from checkout session
        result = save_order_from_session(session)
        payer_email = customer_email_from_session(session)
        print(
            f"Checkout session {session.get('id')}: db={result}, "
            f"payer_email={'set' if payer_email else 'MISSING'}"
        )

        # Email buyer + merchant only for newly inserted orders (not webhook retries)
        if result == "inserted":
            try:
                send_checkout_confirmation_emails(session)
            except Exception as e:
                print(f"EMAIL: order confirmation failed (order still saved): {e}")
        elif result == "duplicate":
            print(
                "WEBHOOK: duplicate checkout.session.completed for this session — "
                "emails are only sent on first insert (Stripe retry)."
            )
        elif result == "error":
            print("WEBHOOK: order was not saved — no confirmation emails sent")
        
    elif event["type"] == "payment_intent.succeeded":
        # This handles direct payment intents (if used elsewhere)
        payment_intent = event["data"]["object"]
        print(f"Payment intent succeeded: {payment_intent['id']}")
        # Note: For checkout sessions, use checkout.session.completed instead
        
    elif event["type"] == "payment_intent.payment_failed":
        payment_intent = event["data"]["object"]
        print(f"Payment failed: {payment_intent['id']}")
        
    elif event["type"] == "payment_intent.canceled":
        payment_intent = event["data"]["object"]
        print(f"Payment canceled: {payment_intent['id']}")

    return Response(status_code=200)
