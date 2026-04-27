import { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import cocoaProcessVideo from '../assets/cocoa_process_video.MP4'

const MISSION_PRODUCT_PRICE = 20
const COCOA_VIDEO_POSTER = encodeURI('/images/Still shot.png')
const PROCESS_VIDEO_ID = 'cocoa_process_farm_to_product'

/** Pushes to dataLayer and gtag (when present) for GA4 / GTM dashboards. 50% = warm lead signal. */
function reportProcessVideoEngagement(detail) {
  if (typeof window === 'undefined') return
  const payload = {
    event: 'process_video_engagement',
    video_id: PROCESS_VIDEO_ID,
    page_path: window.location?.pathname,
    ...detail,
  }
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(payload)
  if (typeof window.gtag === 'function') {
    if (detail.warm_lead) {
      window.gtag('event', 'process_video_warm_lead', {
        event_category: 'engagement',
        event_label: PROCESS_VIDEO_ID,
        value: 50,
      })
    } else if (detail.action === 'start') {
      window.gtag('event', 'process_video_start', {
        event_category: 'engagement',
        event_label: PROCESS_VIDEO_ID,
      })
    } else if (detail.action === 'complete') {
      window.gtag('event', 'process_video_complete', {
        event_category: 'engagement',
        event_label: PROCESS_VIDEO_ID,
        value: 100,
      })
    }
  }
}

function ProcessVideoSection() {
  const startTracked = useRef(false)
  const warm50Tracked = useRef(false)
  const completeTracked = useRef(false)

  const onPlay = useCallback(() => {
    if (startTracked.current) return
    startTracked.current = true
    reportProcessVideoEngagement({ action: 'start' })
  }, [])

  const onTimeUpdate = useCallback((e) => {
    const v = e.currentTarget
    if (!v.duration || !isFinite(v.duration) || v.duration === 0) return
    const progress = v.currentTime / v.duration
    if (!warm50Tracked.current && progress >= 0.5) {
      warm50Tracked.current = true
      reportProcessVideoEngagement({
        action: '50_percent',
        warm_lead: true,
        percent_watched: 50,
      })
    }
  }, [])

  const onEnded = useCallback(() => {
    if (completeTracked.current) return
    completeTracked.current = true
    reportProcessVideoEngagement({ action: 'complete', percent_watched: 100 })
  }, [])

  return (
    <section className="process-video-section" aria-labelledby="process-video-heading">
      <h2 id="process-video-heading" className="section-title process-video-section-title">
        See where your support begins.
      </h2>
      <p className="process-video-intro">
        Watch the cocoa process from farm to product and see why local processing matters for
        farmers, families, and the surrounding community.
      </p>

      <div className="process-video-player-wrap">
        <video
          className="process-video"
          src={cocoaProcessVideo}
          poster={COCOA_VIDEO_POSTER}
          controls
          playsInline
          preload="metadata"
          onPlay={onPlay}
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
        >
          Your browser does not support the video tag.
        </video>
      </div>

      <ul className="process-video-trust-grid" role="list">
        <li className="process-video-trust-card">
          <h3 className="process-video-trust-title">Grown locally</h3>
        </li>
        <li className="process-video-trust-card">
          <h3 className="process-video-trust-title">Processed with care</h3>
        </li>
        <li className="process-video-trust-card">
          <h3 className="process-video-trust-title">Built for long-term impact</h3>
        </li>
      </ul>
    </section>
  )
}

function Home() {
  const [missionQuantity, setMissionQuantity] = useState(1)

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
                100% supports the farm/factory mission
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="home-mission-product" aria-labelledby="mission-product-heading">
        <h2 id="mission-product-heading" className="section-title home-mission-product-title">
          Taste the mission.
        </h2>

        <article className="home-product-card">
          <div className="home-product-image-wrap">
            <img
              src="/images/cocoa_jar.JPEG"
              alt="Organic Liberian cocoa product"
              className="home-product-image"
            />
          </div>

          <div className="home-product-body">
            <h3 className="home-product-name">Organic Cocoa Product</h3>
            <p className="home-product-tagline">Home-grown cocoa from Liberia</p>
            <p className="home-product-price" aria-label={`${MISSION_PRODUCT_PRICE} dollars per item`}>
              <span className="home-product-currency">$</span>
              {MISSION_PRODUCT_PRICE}
            </p>

            <div className="home-product-field">
              <span className="home-product-label" id="mission-qty-label">Quantity</span>
              <div className="home-product-qty" role="group" aria-labelledby="mission-qty-label">
                <button
                  type="button"
                  onClick={() => setMissionQuantity((n) => Math.max(1, n - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="home-product-qty-value" aria-live="polite">
                  {missionQuantity}
                </span>
                <button
                  type="button"
                  onClick={() => setMissionQuantity((n) => n + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div className="home-product-cta">
              <Link
                to={`/checkout?quantity=${missionQuantity}`}
                className="btn home-product-add"
              >
                Add to Cart
              </Link>
            </div>

            <ul className="home-product-trust" aria-label="Order benefits">
              <li>
                <span className="home-product-check" aria-hidden="true">✓</span>
                Organic / naturally grown
              </li>
              <li>
                <span className="home-product-check" aria-hidden="true">✓</span>
                Supports farm development
              </li>
              <li>
                <span className="home-product-check" aria-hidden="true">✓</span>
                Small-batch product
              </li>
              <li>
                <span className="home-product-check" aria-hidden="true">✓</span>
                Secure checkout
              </li>
            </ul>
          </div>
        </article>
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

        <div className="problem-cta">
          <p className="problem-cta-lead">Help us keep more value in Liberia.</p>
          <Link to="/fund" className="btn btn-secondary problem-cta-btn">
            Fund the Factory
          </Link>
        </div>
      </section>

      <ProcessVideoSection />

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


