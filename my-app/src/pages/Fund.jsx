import { Link } from 'react-router-dom'

function Fund() {
  return (
    <>
      {/* Product Hero Section */}
      <section className="product-hero">
        <h2>Divine Lumina – Raw & Unrefined Cocoa Butter</h2>
        <img src="/images/cocoa_jar.JPEG" alt="8 oz jar of Divine Lumina Cocoa Butter" className="product-img" />
        <p style={{fontSize: '1.4rem', margin: '2rem 0'}}>8 oz • Every jar directly supports processing infrastructure in Liberia.</p>
        <Link to="/checkout" className="btn" style={{fontSize: '1.5rem', padding: '1.2rem 3rem'}}>Purchase & Support the Build</Link>
      </section>

      {/* What Makes This Different */}
      <section>
        <h2>What Makes This Different</h2>
        <ul style={{maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem'}}>
          <li>Handmade</li>
          <li>Raw & unrefined</li>
          <li>Liberian-sourced</li>
          <li>No fillers</li>
          <li>Small-batch</li>
        </ul>
      </section>

      {/* The Deeper Meaning */}
      <section style={{background: 'var(--light)'}}>
        <h2>The Deeper Meaning</h2>
        <p style={{textAlign: 'center', fontSize: '1.3rem', maxWidth: '900px', margin: 'auto'}}>
          This jar represents what Liberia can produce when processing happens locally.<br />
          You are buying participation in real change—not just lotion.
        </p>
      </section>

      {/* Fund the Factory Section */}
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
      </section>

      {/* How Funds Are Used */}
      <section>
        <h2>How Funds Are Used</h2>
        <p style={{textAlign: 'center', fontSize: '1.3rem'}}>
          Proceeds go toward building cocoa processing capacity in Liberia.
        </p>
      </section>
    </>
  )
}

export default Fund


