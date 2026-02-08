import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      {/* Hero Section with Image + Card Layout */}
      <section className="hero-split">
        <div className="hero-image-container">
          <img 
            src="/images/village_with_darcy.jpg" 
            alt="Liberia cocoa farmers with pods" 
            className="hero-image"
          />
        </div>
        <div className="hero-card">
          <div className="hero-card-content">
            <h2>Impact Snapshot</h2>
            <div className="impact-grid">
              <div className="impact-item">
                <h3>Jobs Created</h3>
                <p>Local employment in processing and farming</p>
              </div>
              <div className="impact-item">
                <h3>Farmers Supported</h3>
                <p>700-acre farm in Nimba County + community partners</p>
              </div>
              <div className="impact-item">
                <h3>Value Retained Locally</h3>
                <p>Keeping wealth in Liberia</p>
              </div>
              <div className="impact-item">
                <h3>Community Ownership</h3>
                <p>Shared prosperity model</p>
              </div>
            </div>
            <Link to="/progress" className="btn" style={{marginTop: '2rem'}}>View Progress</Link>
          </div>
        </div>
      </section>

      <section className="hero">
        <h1>From Raw to Real</h1>
        <p>Every jar helps build Liberia's first community owned scalable cocoa processing facility.</p>
        <Link to="/checkout" className="btn">Support the Processing Facility</Link>
        <Link to="/fund" className="btn btn-secondary">See the Cocoa Butter</Link>
      </section>

      <section>
        <h2>The Problem</h2>
        <div className="grid">
          <div>
            <img src="/images/Liberia_cocoa_farmers_pods.JPEG" alt="Liberia cocoa farmers with pods" />
            <p>Liberia exports nearly all its cocoa raw.</p>
          </div>
          <div>
            <img src="/images/cocoa_closeup.JPEG" alt="Close-up of cocoa pod" />
            <p>Most of the value is captured abroad.</p>
          </div>
          <div>
            <img src="/images/farmer_and_tree.JPEG" alt="Farmer holding cocoa tree" />
            <p>This isn't a farming problem—it's a processing problem.</p>
          </div>
        </div>
      </section>

      <section style={{background: '#f8f4ed'}}>
        <h2>The Solution</h2>
        <p style={{textAlign: 'center', maxWidth: '900px', margin: '0 auto 3rem', fontSize: '1.2rem'}}>
          We are building local processing so value, jobs, and income stay in Liberia.
        </p>
        <div className="grid">
          <div className="card">
            <img src="/images/cocoa_closeup.JPEG" alt="Cocoa pods on tree" />
            <h3>Raw Cocoa Beans</h3>
          </div>
          <div className="card">
            <img src="/images/cocoa_jar.JPEG" alt="Divine Lumina Cocoa Butter Jar" />
            <h3>→ Cocoa Butter</h3>
          </div>
          <div className="card">
            <img src="/images/farmer_holding_pods.jpeg" alt="Farmers holding cocoa pods" />
            <h3>Finished Product & Opportunity</h3>
          </div>
        </div>
      </section>

      <section>
        <h2>Proof of Concept: Cocoa Butter</h2>
        <p style={{textAlign: 'center', fontSize: '1.3rem'}}>
          This cocoa butter is handmade today. Tomorrow, it will be produced at scale in Liberia.
        </p>
        <div style={{textAlign: 'center', margin: '3rem 0'}}>
          <img src="/images/cocoa_jar.JPEG" alt="Divine Lumina Raw & Unrefined Cocoa Butter" className="product-img" />
        </div>
        <div style={{textAlign: 'center'}}>
          <Link to="/fund" className="btn">Get a Jar & Support the Build</Link>
        </div>
      </section>

      <section>
        <h2>Trust & Legitimacy</h2>
        <p style={{textAlign: 'center', fontSize: '1.2rem'}}>
          700-acre farm in Nimba County • Community partnership • Traceable & ethical sourcing
        </p>
      </section>
    </>
  )
}

export default Home


