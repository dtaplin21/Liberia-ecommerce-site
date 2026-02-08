import { useSearchParams, Link } from 'react-router-dom'

function CheckoutSuccess() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')

  return (
    <section style={{padding: '60px 20px', textAlign: 'center'}}>
      <div style={{maxWidth: '800px', margin: '0 auto', background: 'white', padding: '3rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}}>
        <h2 style={{color: 'var(--primary)', marginBottom: '1rem'}}>Payment Successful! 🎉</h2>
        <p style={{fontSize: '1.2rem', marginBottom: '2rem', color: '#666'}}>
          Thank you for your purchase. Your order has been confirmed and you will receive a confirmation email shortly.
        </p>
        {sessionId && (
          <p style={{color: '#999', fontSize: '0.9rem', marginBottom: '2rem'}}>
            Order ID: {sessionId}
          </p>
        )}
        <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
          <Link to="/" className="btn">Return to Home</Link>
          <Link to="/fund" className="btn btn-secondary">Shop More</Link>
        </div>
      </div>
    </section>
  )
}

export default CheckoutSuccess



