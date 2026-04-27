import { Link } from 'react-router-dom'
import {
  HeartHandshake,
  Droplet,
  MapPin,
  Leaf,
  PackageCheck,
} from 'lucide-react'

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
      <section className="difference-section">
        <div className="difference-panel">
          <div className="difference-heading">
            <h2>What Makes This Different</h2>
            <div className="difference-divider" aria-hidden="true">
              <span></span>
              <Leaf size={22} strokeWidth={2.2} />
              <span></span>
            </div>
          </div>

          <div className="difference-content">
            <div className="difference-story">
              <div className="cocoa-illustration" aria-hidden="true">
                <div className="cocoa-pod">
                  <div className="cocoa-beans">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="cocoa-leaf cocoa-leaf-one"></div>
                <div className="cocoa-leaf cocoa-leaf-two"></div>
              </div>

              <h3>Pure by nature. Powerful by people.</h3>

              <p>
                Every jar is a reflection of our commitment to authenticity, purity,
                and the people of Liberia.
              </p>

              <p className="difference-emphasis">
                Nothing extra. Nothing hidden. Just real ingredients, real impact.
              </p>
            </div>

            <div className="difference-list">
              <div className="difference-item">
                <div className="difference-icon difference-icon-brown">
                  <HeartHandshake size={24} strokeWidth={2.3} />
                </div>

                <div>
                  <h4>Handmade</h4>
                  <p>Made with care, not machines.</p>
                </div>
              </div>

              <div className="difference-item">
                <div className="difference-icon difference-icon-gold">
                  <Droplet size={24} strokeWidth={2.3} />
                </div>

                <div>
                  <h4>Raw & unrefined</h4>
                  <p>Nutrient-rich and minimally processed.</p>
                </div>
              </div>

              <div className="difference-item">
                <div className="difference-icon difference-icon-green">
                  <MapPin size={24} strokeWidth={2.3} />
                </div>

                <div>
                  <h4>Liberian-sourced</h4>
                  <p>Sourced directly from Liberian communities.</p>
                </div>
              </div>

              <div className="difference-item">
                <div className="difference-icon difference-icon-brown">
                  <Leaf size={24} strokeWidth={2.3} />
                </div>

                <div>
                  <h4>No fillers</h4>
                  <p>No additives. No shortcuts.</p>
                </div>
              </div>

              <div className="difference-item">
                <div className="difference-icon difference-icon-green">
                  <PackageCheck size={24} strokeWidth={2.3} />
                </div>

                <div>
                  <h4>Small-batch</h4>
                  <p>Made in limited batches for maximum quality.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Deeper Meaning */}
      <section className="deeper-meaning-section" style={{background: 'var(--light)'}}>
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


