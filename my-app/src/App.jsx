import './App.css'

function App() {
  return (
    <>
      <header>
        <img src="/images/The UNNAMED FARM.JPEG" alt="The Unnamed Farm Logo" className="logo" />
        <nav>
          <a href="#home">Home</a>
          <a href="#fund">Fund the Factory</a>
          <a href="#product">Cocoa Butter</a>
          <a href="#story">Our Story</a>
          <a href="#impact">Impact</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* 1. HOMEPAGE */}
      <section id="home" className="hero">
        <h1>From Raw to Real</h1>
        <p>Every jar helps build Liberia's first scalable cocoa processing facility.</p>
        <a href="#fund" className="btn">Support the Processing Facility</a>
        <a href="#product" className="btn btn-secondary">See the Cocoa Butter</a>
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
          <a href="#product" className="btn">Get a Jar & Support the Build</a>
        </div>
      </section>

      <section style={{background: 'var(--secondary)', color: 'white'}}>
        <h2>Impact Snapshot</h2>
        <div className="grid">
          <div style={{textAlign: 'center'}}>
            <h3>Jobs Created</h3>
            <p>Local employment in processing and farming</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <h3>Farmers Supported</h3>
            <p>700-acre farm in Nimba County + community partners</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <h3>Value Retained Locally</h3>
            <p>Keeping wealth in Liberia</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <h3>Community Ownership</h3>
            <p>Shared prosperity model</p>
          </div>
        </div>
      </section>

      <section>
        <h2>Trust & Legitimacy</h2>
        <p style={{textAlign: 'center', fontSize: '1.2rem'}}>
          700-acre farm in Nimba County • Community partnership • Traceable & ethical sourcing
        </p>
      </section>

      {/* 2. FUND THE FACTORY */}
      <section id="fund" style={{background: '#f0e8df'}}>
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
          <a href="#product" className="btn">Support the Factory by Purchasing Cocoa Butter</a>
        </div>
      </section>

      {/* 3. COCOA BUTTER PRODUCT PAGE */}
      <section id="product" className="product-hero">
        <h2>Divine Lumina – Raw & Unrefined Cocoa Butter</h2>
        <img src="/images/cocoa_jar.JPEG" alt="8 oz jar of Divine Lumina Cocoa Butter" className="product-img" />
        <p style={{fontSize: '1.4rem', margin: '2rem 0'}}>8 oz • Every jar directly supports processing infrastructure in Liberia.</p>
        <a href="#" className="btn" style={{fontSize: '1.5rem', padding: '1.2rem 3rem'}}>Purchase & Support the Build</a>
      </section>

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

      <section style={{background: 'var(--light)'}}>
        <h2>The Deeper Meaning</h2>
        <p style={{textAlign: 'center', fontSize: '1.3rem', maxWidth: '900px', margin: 'auto'}}>
          This jar represents what Liberia can produce when processing happens locally.<br />
          You are buying participation in real change—not just lotion.
        </p>
      </section>

      <section>
        <h2>How Funds Are Used</h2>
        <p style={{textAlign: 'center', fontSize: '1.3rem'}}>
          Proceeds go toward building cocoa processing capacity in Liberia.
        </p>
      </section>
    </>
  )
}

export default App

