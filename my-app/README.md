# The Unnamed Farm - E-commerce Platform

An e-commerce platform for The Unnamed Farm, selling Liberian-sourced cocoa butter products. The platform supports product browsing, checkout, and payment processing, with proceeds going toward building cocoa processing infrastructure in Liberia.

## 🎯 What This System Does

This is a full-stack e-commerce application that:

- **Displays Products**: Showcases Divine Lumina Raw & Unrefined Cocoa Butter with product details and images
- **Handles Checkout**: Complete checkout flow with shipping information, quantity selection, and order summary
- **Processes Payments**: Integrated Stripe payment processing for secure transactions
- **Manages Orders**: Stores completed orders in PostgreSQL database
- **Tracks Impact**: Highlights the mission of supporting Liberian cocoa processing facilities

## 🏗️ Architectural Overview

### Tech Stack

**Frontend:**
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Stripe.js** - Payment processing integration

**Backend:**
- **FastAPI** - Python web framework
- **PostgreSQL** - Relational database
- **Stripe API** - Payment processing
- **psycopg2** - PostgreSQL adapter

**Architecture Pattern:**
- **Frontend-Backend Separation**: React frontend communicates with FastAPI backend via REST API
- **Database-Driven**: PostgreSQL stores products and orders
- **Payment Gateway Integration**: Stripe handles secure payment processing

### System Flow

```
User Browser (React)
    ↓
React Router (Client-side routing)
    ↓
Checkout Page → Calls Backend API
    ↓
FastAPI Backend (/create-payment-intent)
    ↓
Stripe API (Payment processing)
    ↓
Stripe Webhook → Backend (/webhook)
    ↓
PostgreSQL Database (Order storage)
```

### Key Components

1. **Frontend (React)**: User interface with routing, forms, and Stripe integration
2. **Backend API (FastAPI)**: RESTful API for products and payment processing
3. **Database (PostgreSQL)**: Stores products and completed orders
4. **Payment Gateway (Stripe)**: Handles secure payment transactions

## 🚀 How to Run

### Prerequisites

- Node.js (v18+)
- Python 3.14+
- PostgreSQL (running locally)
- Stripe account (for payment processing)

### Frontend Setup

1. **Install dependencies:**
   ```bash
   cd my-app
   npm install
   ```

2. **Create environment file:**
   ```bash
   # Create .env file in my-app/
   echo "VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here" > .env
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Activate virtual environment:**
   ```bash
   source venv/bin/activate  # On macOS/Linux
   # or
   venv\Scripts\activate     # On Windows
   ```

3. **Install dependencies (if needed):**
   ```bash
   pip install fastapi uvicorn psycopg2-binary python-dotenv stripe
   ```

4. **Create environment file:**
   ```bash
   # Create .env file in backend/
   cat > .env << EOF
   DB_HOST=localhost
   DB_NAME=liberia_ecommerce
   DB_USER=dtaplin21
   DB_PASSWORD=
   DB_PORT=5432
   STRIPE_SECRET_KEY=sk_test_your_key_here
   STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   EOF
   ```

5. **Set up database:**
   ```bash
   psql -U dtaplin21 -d liberia_ecommerce -f create_orders_table.sql
   ```

6. **Start backend server:**
   ```bash
   uvicorn main:app --reload
   ```
   Backend will run on `http://localhost:8000`

### Running Both Servers

Open two terminal windows:

**Terminal 1 - Frontend:**
```bash
cd my-app
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload
```

## 📁 Main Key Folders

### Frontend Structure (`my-app/`)

```
my-app/
├── src/
│   ├── components/          # Reusable React components
│   │   └── Header.jsx      # Navigation header component
│   ├── pages/              # Page components (routes)
│   │   ├── Home.jsx       # Homepage
│   │   ├── Product.jsx    # Product detail page
│   │   ├── Checkout.jsx   # Checkout page with Stripe
│   │   ├── Fund.jsx       # Fund the Factory page
│   │   ├── Story.jsx       # Our Story page
│   │   ├── Impact.jsx     # Impact page
│   │   ├── FAQ.jsx         # FAQ page
│   │   └── Contact.jsx     # Contact page
│   ├── App.jsx             # Main app component with routing
│   ├── App.css             # Global component styles
│   ├── index.css           # Base styles and CSS variables
│   └── main.jsx            # React entry point
├── public/
│   └── images/             # Product and brand images
├── package.json            # Frontend dependencies
└── vite.config.js          # Vite configuration
```

### Backend Structure (`backend/`)

```
backend/
├── main.py                 # FastAPI application & API endpoints
├── database.py             # PostgreSQL connection utilities
├── create_orders_table.sql # Database schema for orders
├── venv/                   # Python virtual environment
└── .env                    # Environment variables (not in git)
```

### Key Files Explained

**Frontend:**
- `src/App.jsx` - Main application component with React Router setup
- `src/pages/Checkout.jsx` - Checkout page with Stripe integration
- `src/components/Header.jsx` - Reusable header navigation component
- `src/App.css` - Component styles (buttons, cards, sections)
- `src/index.css` - Base styles and CSS custom properties

**Backend:**
- `backend/main.py` - FastAPI app with endpoints:
  - `GET /products` - Fetch all products
  - `POST /create-payment-intent` - Create Stripe payment intent
  - `POST /webhook` - Handle Stripe webhook events
- `backend/database.py` - Database connection helper functions
- `backend/create_orders_table.sql` - SQL schema for Orders table

## 🔌 API Endpoints

### Products
- `GET /products` - Get all products

### Payments
- `POST /create-payment-intent` - Create Stripe payment intent
  - Request: `{ "amount": 3718, "currency": "usd", "metadata": {...} }`
  - Response: `{ "clientSecret": "...", "paymentIntentId": "..." }`

### Webhooks
- `POST /webhook` - Stripe webhook endpoint (receives payment events)

## 🗄️ Database Schema

### Products Table
- `id` - Primary key
- `Name` - Product name (TEXT)
- `Price` - Product price (INTEGER)
- `inventory` - Stock quantity (INTEGER)
- `created_at` - Timestamp

### Orders Table
- `id` - Primary key
- `stripe_payment_intent_id` - Stripe payment ID (UNIQUE)
- `customer_name` - Customer full name
- `customer_email` - Customer email
- `customer_address` - Shipping address
- `customer_city` - City
- `customer_state` - State
- `customer_zip` - ZIP code
- `total_amount` - Order total (DECIMAL)
- `quantity` - Product quantity
- `product_name` - Product name
- `status` - Order status
- `created_at` - Timestamp

## 🔐 Environment Variables

### Frontend (`.env`)
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Backend (`.env`)
```
DB_HOST=localhost
DB_NAME=liberia_ecommerce
DB_USER=dtaplin21
DB_PASSWORD=
DB_PORT=5432
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## 🧪 Testing Stripe Integration

Use Stripe test cards:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

Expiry: Any future date (e.g., 12/25)  
CVC: Any 3 digits (e.g., 123)  
ZIP: Any 5 digits (e.g., 12345)

## 📝 Development Notes

- Frontend runs on port `5173` (Vite default)
- Backend runs on port `8000` (Uvicorn default)
- CORS is configured to allow frontend-backend communication
- Stripe webhooks require HTTPS (use ngrok for local testing)
- Database connection uses environment variables for security

## 🔗 External Services

- **Stripe Dashboard**: https://dashboard.stripe.com
- **Stripe API Docs**: https://stripe.com/docs/api
- **FastAPI Docs**: http://localhost:8000/docs (when backend is running)
