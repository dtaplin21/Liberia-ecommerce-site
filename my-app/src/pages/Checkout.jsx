import { useState } from 'react'

function Checkout() {
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const productPrice = 30
  const shippingCost = 5
  const taxRate = 0.0725  // 7.25% California sales tax
  
  const subtotal = productPrice * quantity
  const tax = subtotal * taxRate
  const total = subtotal + shippingCost + tax
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Calculate total in cents (Stripe requires cents)
      const amountInCents = Math.round(total * 100)

      // Call backend to create checkout session
      const response = await fetch('http://localhost:8000/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amountInCents,
          currency: 'usd',
          customer_email: formData.email,
          customer_name: formData.name,
          quantity: quantity,
          success_url: `${window.location.origin}/checkout/success`,
          cancel_url: `${window.location.origin}/checkout`
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Failed to create checkout session')
      }

      const { url } = await response.json()

      // Redirect to Stripe Checkout (simpler - just redirect!)
      window.location.href = url

    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <section style={{padding: '60px 20px'}}>
      <h2>Checkout</h2>
      
      {error && (
        <div style={{
          background: '#fee',
          color: '#c33',
          padding: '1rem',
          borderRadius: '4px',
          marginBottom: '1rem',
          maxWidth: '1200px',
          margin: '0 auto 1rem'
        }}>
          Error: {error}
        </div>
      )}
      
      <div style={{maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem'}}>
        {/* Order Summary */}
        <div>
          <h3 style={{color: 'var(--primary)', marginBottom: '1.5rem'}}>Order Summary</h3>
          <div style={{background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', border: '1px solid #ddd'}}>
            {/* Product Image */}
            <div style={{marginBottom: '1.5rem', textAlign: 'center'}}>
              <img 
                src="/images/cocoa_jar.JPEG" 
                alt="Divine Lumina Cocoa Butter" 
                style={{
                  width: '100%',
                  maxWidth: '200px',
                  height: 'auto',
                  borderRadius: '8px',
                  objectFit: 'cover'
                }}
              />
            </div>
            
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #eee'}}>
              <div>
                <p style={{fontWeight: 'bold', margin: 0}}>Divine Lumina Cocoa Butter</p>
                <p style={{margin: 0, color: '#666'}}>8 oz</p>
              </div>
              <p style={{fontWeight: 'bold', margin: 0}}>${productPrice}</p>
            </div>
            <div style={{marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #eee'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem'}}>Quantity</label>
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{padding: '0.5rem 1rem', border: '1px solid #ddd', borderRadius: '4px', background: 'white', cursor: 'pointer', fontSize: '1.2rem'}}
                >
                  -
                </button>
                <span style={{fontWeight: 'bold', minWidth: '2rem', textAlign: 'center'}}>{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  style={{padding: '0.5rem 1rem', border: '1px solid #ddd', borderRadius: '4px', background: 'white', cursor: 'pointer', fontSize: '1.2rem'}}
                >
                  +
                </button>
              </div>
            </div>
            {/* Subtotal */}
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee'}}>
              <p style={{margin: 0, color: '#666'}}>Subtotal</p>
              <p style={{margin: 0, fontWeight: 'bold'}}>${subtotal.toFixed(2)}</p>
            </div>
            
            {/* Shipping */}
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem'}}>
              <p style={{margin: 0, color: '#666'}}>Shipping</p>
              <p style={{margin: 0, fontWeight: 'bold'}}>${shippingCost.toFixed(2)}</p>
            </div>
            
            {/* Tax */}
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem'}}>
              <p style={{margin: 0, color: '#666'}}>Tax</p>
              <p style={{margin: 0, fontWeight: 'bold'}}>${tax.toFixed(2)}</p>
            </div>
            
            {/* Total */}
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '1rem', borderTop: '2px solid var(--primary)'}}>
              <p style={{fontSize: '1.2rem', fontWeight: 'bold', margin: 0}}>Total</p>
              <p style={{fontSize: '1.2rem', fontWeight: 'bold', margin: 0}}>${total.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div style={{padding: '2rem'}}>
          <h3 style={{color: 'var(--primary)', marginBottom: '1.5rem'}}>Shipping Information</h3>
          <form onSubmit={handleSubmit} style={{background: 'white', padding: '4rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', border: '1px solid #ddd'}}>
            <div style={{marginBottom: '1rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold'}}>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem'}}
              />
            </div>

            <div style={{marginBottom: '1rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold'}}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem'}}
              />
            </div>

            <div style={{marginBottom: '1rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold'}}>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                style={{width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem'}}
              />
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem', marginBottom: '1rem'}}>
              <div>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold'}}>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  style={{width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem'}}
                />
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold'}}>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  style={{width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem'}}
                />
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold'}}>ZIP</label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  required
                  style={{width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem'}}
                />
              </div>
            </div>

            <div style={{marginTop: '2rem', padding: '1rem', background: '#f9f9f9', borderRadius: '4px', marginBottom: '1rem'}}>
              <p style={{margin: 0, fontSize: '0.9rem', color: '#666'}}>
                You will be redirected to Stripe's secure checkout page to complete your payment.
              </p>
            </div>

            <button
              type="submit"
              className="btn"
              style={{width: '100%', fontSize: '1.2rem', padding: '1rem', marginTop: '1rem'}}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Complete Purchase'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Checkout

