import { useState } from 'react'

function Checkout() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement payment processing
    alert('Order submitted! (Payment processing to be implemented)')
  }

  return (
    <section style={{padding: '60px 20px'}}>
      <h2>Checkout</h2>
      
      <div style={{maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem'}}>
        {/* Order Summary */}
        <div>
          <h3 style={{color: 'var(--primary)', marginBottom: '1.5rem'}}>Order Summary</h3>
          <div style={{background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #eee'}}>
              <div>
                <p style={{fontWeight: 'bold', margin: 0}}>Divine Lumina Cocoa Butter</p>
                <p style={{margin: 0, color: '#666'}}>8 oz</p>
              </div>
              <p style={{fontWeight: 'bold', margin: 0}}>$30</p>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '1rem', borderTop: '2px solid var(--primary)'}}>
              <p style={{fontSize: '1.2rem', fontWeight: 'bold', margin: 0}}>Total</p>
              <p style={{fontSize: '1.2rem', fontWeight: 'bold', margin: 0}}>$30</p>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div>
          <h3 style={{color: 'var(--primary)', marginBottom: '1.5rem'}}>Shipping Information</h3>
          <form onSubmit={handleSubmit} style={{background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}}>
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

            <h3 style={{color: 'var(--primary)', marginTop: '2rem', marginBottom: '1.5rem'}}>Payment Information</h3>

            <div style={{marginBottom: '1rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold'}}>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                required
                style={{width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem'}}
              />
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1.5rem'}}>
              <div>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold'}}>Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  required
                  style={{width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem'}}
                />
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold'}}>CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  required
                  style={{width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem'}}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn"
              style={{width: '100%', fontSize: '1.2rem', padding: '1rem', marginTop: '1rem'}}
            >
              Complete Purchase
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Checkout

