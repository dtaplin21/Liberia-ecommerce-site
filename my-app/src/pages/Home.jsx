import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
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
            <div className="grid-photo-wrap">
              <img src="/images/Liberia_cocoa_farmers_pods.JPEG" alt="Liberia cocoa farmers with pods" />
            </div>
            <p>Liberia exports nearly all its cocoa raw.</p>
          </div>
          <div>
            <div className="grid-photo-wrap">
              <img src="/images/Shipping.PNG" alt="Cocoa shipping and logistics" />
            </div>
            <p>Most of the value is captured abroad.</p>
          </div>
          <div>
            <div className="grid-photo-wrap">
              <img src="/images/processing%20facility.PNG" alt="Cocoa processing facility" />
            </div>
            <p>This isn't a farming problem—it's a processing problem.</p>
          </div>
        </div>
      </section>

      {/* Impact Snapshot Card */}
      <section style={{background: 'linear-gradient(135deg, #8B6F47 0%, #6B4E3D 100%)', color: 'white', padding: '3rem 2rem', margin: '3rem auto', maxWidth: '900px', borderRadius: '8px'}}>
        <div style={{maxWidth: '800px', margin: '0 auto'}}>
          <h2 style={{color: 'white', textAlign: 'center', marginBottom: '2rem'}}>Impact Snapshot</h2>
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
          <div style={{textAlign: 'center', marginTop: '2rem'}}>
            <Link to="/progress" className="btn" style={{marginTop: '2rem'}}>View Progress</Link>
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
            <div className="grid-photo-wrap">
              <img src="/images/Hands_on_seeds.JPG" alt="Hands holding cocoa seeds" />
            </div>
            <h3>Raw Cocoa Beans</h3>
          </div>
          <div className="card">
            <div className="grid-photo-wrap">
              <img src="/images/cocoa_jar.JPEG" alt="Divine Lumina Cocoa Butter Jar" />
            </div>
            <h3>→ Cocoa Butter</h3>
          </div>
          <div className="card">
            <div className="grid-photo-wrap">
              <img src="/images/pod_beans_chocolate.JPG" alt="Cocoa pods, beans, and chocolate" />
            </div>
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

      <footer>
        <div className="footer-inner">
          <p className="footer-tagline">
            The Unnamed Farm — Liberian cocoa, processed with purpose.
          </p>
          <nav className="footer-links" aria-label="Footer navigation">
            <Link to="/">Home</Link>
            <Link to="/fund">Fund the Factory</Link>
            <Link to="/progress">Progress Tracker</Link>
            <Link to="/story">Our Story</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <p className="footer-muted">
            &copy; {new Date().getFullYear()} The Unnamed Farm Ltd. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}

export default Home


