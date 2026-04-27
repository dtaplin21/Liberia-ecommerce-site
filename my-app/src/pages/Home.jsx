import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <section className="hero-home" aria-labelledby="hero-heading">
        <div className="hero-home-inner">
          <div className="hero-home-copy">
            <h1 id="hero-heading">
              From Liberian cocoa farms to real economic opportunity.
            </h1>
            <p className="hero-home-lead">
              Organic, home-grown cocoa products that help fund local processing, farmer income,
              and long-term sustainability.
            </p>
            <div className="hero-home-ctas">
              <Link to="/checkout" className="btn">Buy Cocoa Products</Link>
              <Link to="/fund" className="btn btn-secondary">Fund the Factory</Link>
            </div>
            <p className="hero-home-trust">
              Organic cocoa. Home-grown. Directly tied to Liberian farm impact.
            </p>
          </div>
          <div className="hero-home-media">
            <div className="hero-home-image-wrap">
              <img
                src="/images/Liberia_cocoa_farmers_pods.JPEG"
                alt="Liberian farmers with cocoa pods at harvest"
                className="hero-home-image"
              />
              <p className="hero-home-overlay-card" role="note">
                20% supports the farm/factory mission
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="problem-section">
        <h2 className="section-title">The Problem</h2>

        <div className="problem-grid">
          <article className="problem-card">
            <img
              src="/images/Liberia_cocoa_farmers_pods.JPEG"
              alt="Liberian cocoa farmers harvesting cocoa pods"
              className="problem-image"
            />

            <div className="problem-caption problem-caption-brown">
              <div className="caption-icon" aria-hidden="true">
                <span>◉</span>
              </div>

              <div className="caption-copy">
                <h3>Liberia exports raw cocoa</h3>
                <p>
                  Most beans leave the country before local processing can create
                  higher-value products.
                </p>
              </div>
            </div>

            <div className="caption-arrow caption-arrow-brown" aria-hidden="true" />
          </article>

          <article className="problem-card">
            <img
              src="/images/Shipping.PNG"
              alt="Cargo ship carrying cocoa value away from Liberia"
              className="problem-image"
            />

            <div className="problem-caption problem-caption-green">
              <div className="caption-icon" aria-hidden="true">
                <span>◎</span>
              </div>

              <div className="caption-copy">
                <h3>Value is lost offshore</h3>
                <p>
                  The downstream profits are earned abroad instead of in Liberian
                  communities.
                </p>
              </div>
            </div>

            <div className="caption-arrow caption-arrow-green" aria-hidden="true" />
          </article>

          <article className="problem-card">
            <img
              src="/images/processing%20facility.PNG"
              alt="Cocoa processing facility representing local manufacturing"
              className="problem-image"
            />

            <div className="problem-caption problem-caption-brown">
              <div className="caption-icon" aria-hidden="true">
                <span>▣</span>
              </div>

              <div className="caption-copy">
                <h3>Processing changes everything</h3>
                <p>
                  Building local processing is the key to retaining value, jobs, and
                  long-term impact.
                </p>
              </div>
            </div>

            <div className="caption-arrow caption-arrow-brown" aria-hidden="true" />
          </article>
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


