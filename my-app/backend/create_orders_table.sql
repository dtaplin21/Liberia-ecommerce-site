-- Create Orders table for storing completed orders
CREATE TABLE IF NOT EXISTS Orders (
    id SERIAL PRIMARY KEY,
    stripe_payment_intent_id VARCHAR(255) UNIQUE NOT NULL,
    customer_name VARCHAR(255),
    customer_email VARCHAR(255),
    customer_address VARCHAR(255),
    customer_city VARCHAR(100),
    customer_state VARCHAR(50),
    customer_zip VARCHAR(20),
    total_amount DECIMAL(10, 2),
    quantity INTEGER,
    product_name VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create index on payment intent ID for faster lookups
CREATE INDEX IF NOT EXISTS idx_stripe_payment_intent_id ON Orders(stripe_payment_intent_id);

-- Create index on customer email for order history
CREATE INDEX IF NOT EXISTS idx_customer_email ON Orders(customer_email);

