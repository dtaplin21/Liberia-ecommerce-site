import { Link } from 'react-router-dom'

function Fund() {
  return (
    <section style={{background: '#f0e8df'}}>
      <h2>Fund the Factory</h2>
      <h3>What We're Building</h3>
      <p>A scalable cocoa processing facility producing:</p>
      <ul style={{maxWidth: '800px', margin: '1rem auto', fontSize: '1.2rem'}}>
        <li>Cocoa butter</li>
        <li>Cocoa powder</li>
        <li>Cocoa liquor</li>
        <li>Cocoa nibs</li>
      </ul>
      <p style={{fontWeight: 'bold', textAlign: 'center'}}>Local jobs • Local ownership • Local value capture</p>

      <h3>Why Processing Matters</h3>
      <p>Raw exports = low income. Processing = higher wages, skills, and stability. Processing is where wealth is created.</p>

      <h3>How Your Support Is Used</h3>
      <div className="grid">
        <div className="card"><h3>Equipment Procurement</h3></div>
        <div className="card"><h3>Facility Construction</h3></div>
        <div className="card"><h3>Power & Energy Systems</h3></div>
        <div className="card"><h3>Workforce Training</h3></div>
      </div>

      <h3>Why Cocoa Butter?</h3>
      <p>High-value, globally demanded, core output of processing. Buyers are already asking for it.</p>

      <div style={{textAlign: 'center', margin: '4rem 0'}}>
        <img src="/images/cocoa_jar.JPEG" alt="Divine Lumina Cocoa Butter" className="product-img" />
        <br /><br />
        <Link to="/checkout" className="btn">Support the Factory by Purchasing Cocoa Butter</Link>
      </div>
    </section>
  )
}

export default Fund


