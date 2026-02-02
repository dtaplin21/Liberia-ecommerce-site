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

load_dotenv()

# Initialize Stripe
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

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
            metadata={
                'customer_name': request.customer_name,
                'quantity': str(request.quantity),
                'product': 'Divine Lumina Cocoa Butter'
            },
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

# Helper function to save order to database
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

    # Handle the event
    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        
        # Retrieve the payment intent from the session
        payment_intent_id = session.payment_intent
        
        # Get full payment intent details
        payment_intent = stripe.PaymentIntent.retrieve(payment_intent_id)
        
        # Save order to database
        save_order_to_database(payment_intent)
        print(f"Checkout completed: {session['id']}")
        
    elif event["type"] == "payment_intent.succeeded":
        payment_intent = event["data"]["object"]
        
        # Payment succeeded - save order to database
        save_order_to_database(payment_intent)
        print(f"Payment succeeded: {payment_intent['id']}")
        
    elif event["type"] == "payment_intent.payment_failed":
        payment_intent = event["data"]["object"]
        print(f"Payment failed: {payment_intent['id']}")
        
    elif event["type"] == "payment_intent.canceled":
        payment_intent = event["data"]["object"]
        print(f"Payment canceled: {payment_intent['id']}")

    return Response(status_code=200)

    