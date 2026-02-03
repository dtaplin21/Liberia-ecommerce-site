import { useState, useEffect } from 'react'

function ProgressTracker() {
  const [stats, setStats] = useState({
    total_proceeds: 0,
    total_jars_sold: 0,
    total_orders: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:8000/stats')
      
      if (!response.ok) {
        throw new Error('Failed to fetch statistics')
      }
      
      const data = await response.json()
      setStats(data)
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching stats:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section style={{padding: '60px 20px', textAlign: 'center'}}>
        <h2>Progress Tracker</h2>
        <p>Loading statistics...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section style={{padding: '60px 20px', textAlign: 'center'}}>
        <h2>Progress Tracker</h2>
        <p style={{color: '#c33'}}>Error: {error}</p>
        <button onClick={fetchStats} className="btn" style={{marginTop: '1rem'}}>
          Retry
        </button>
      </section>
    )
  }

  return (
    <section style={{padding: '60px 20px', maxWidth: '1200px', margin: '0 auto'}}>
      <h2>Progress Tracker</h2>
      
      <div className="grid" style={{marginTop: '3rem', gap: '2rem'}}>
        {/* Total Proceeds Card */}
        <div className="card" style={{
          padding: '2rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
          color: 'white'
        }}>
          <h3 style={{marginTop: 0, color: 'white', fontSize: '1.5rem'}}>Total Proceeds</h3>
          <p style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            margin: '1rem 0',
            color: 'white'
          }}>
            ${stats.total_proceeds.toFixed(2)}
          </p>
          <p style={{opacity: 0.9, margin: 0}}>Raised for the factory</p>
        </div>

        {/* Total Jars Sold Card */}
        <div className="card" style={{
          padding: '2rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, var(--accent) 0%, #e08c3e 100%)',
          color: 'white'
        }}>
          <h3 style={{marginTop: 0, color: 'white', fontSize: '1.5rem'}}>Jars Sold</h3>
          <p style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            margin: '1rem 0',
            color: 'white'
          }}>
            {stats.total_jars_sold}
          </p>
          <p style={{opacity: 0.9, margin: 0}}>Cocoa butter jars</p>
        </div>

        {/* Total Orders Card */}
        <div className="card" style={{
          padding: '2rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, var(--secondary) 0%, #6b8550 100%)',
          color: 'white'
        }}>
          <h3 style={{marginTop: 0, color: 'white', fontSize: '1.5rem'}}>Total Orders</h3>
          <p style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            margin: '1rem 0',
            color: 'white'
          }}>
            {stats.total_orders}
          </p>
          <p style={{opacity: 0.9, margin: 0}}>Completed transactions</p>
        </div>
      </div>

      <div style={{
        marginTop: '3rem',
        padding: '2rem',
        background: 'var(--light)',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <p style={{fontSize: '1.2rem', margin: 0, color: 'var(--primary)'}}>
          Every purchase brings us closer to building Liberia's first scalable cocoa processing facility.
        </p>
      </div>
    </section>
  )
}

export default ProgressTracker
