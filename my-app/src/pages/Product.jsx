function Product() {
  return (
    <>
      <section className="product-hero">
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

export default Product

