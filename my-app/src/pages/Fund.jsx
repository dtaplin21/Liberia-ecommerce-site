import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import cocoaProcessVideo from '../assets/cocoa_process_video.MP4'

const COCOA_VIDEO_POSTER = encodeURI('/images/Still shot.png')

function Fund() {
  const videoRef = useRef(null)
  const [showPlayOverlay, setShowPlayOverlay] = useState(true)

  const handlePlayOverlayClick = () => {
    videoRef.current?.play()
  }

  const handleVideoPlay = () => {
    setShowPlayOverlay(false)
  }

  return (
    <>
      {/* Product Hero Section */}
      <section className="product-hero">
        <h2>Divine Lumina – Raw & Unrefined Cocoa Butter</h2>
        <img src="/images/cocoa_jar.JPEG" alt="8 oz jar of Divine Lumina Cocoa Butter" className="product-img" />
        <p style={{fontSize: '1.4rem', margin: '2rem 0'}}>8 oz • Every jar directly supports processing infrastructure in Liberia.</p>
        <Link to="/checkout" className="btn" style={{fontSize: '1.5rem', padding: '1.2rem 3rem'}}>Purchase & Support the Build</Link>
        <div
          style={{
            position: 'relative',
            marginTop: '1.75rem',
            width: '100%',
            maxWidth: 'min(1280px, 100%)',
            marginLeft: 'auto',
            marginRight: 'auto',
            height: 'min(96vh, 680px)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            background: '#1a1816'
          }}
        >
          <video
            ref={videoRef}
            src={cocoaProcessVideo}
            poster={COCOA_VIDEO_POSTER}
            controls={!showPlayOverlay}
            playsInline
            preload="metadata"
            onPlay={handleVideoPlay}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block'
            }}
          >
            Your browser does not support the video tag.
          </video>
          {showPlayOverlay && (
            <button
              type="button"
              aria-label="Play cocoa processing video"
              onClick={handlePlayOverlayClick}
              style={{
                position: 'absolute',
                inset: 0,
                margin: 0,
                padding: 0,
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.25)',
                borderRadius: '12px'
              }}
            >
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 'clamp(64px, 12vw, 96px)',
                  height: 'clamp(64px, 12vw, 96px)',
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.55)',
                  border: '3px solid rgba(255,255,255,0.95)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.35)'
                }}
              >
                <svg width="36" height="36" viewBox="0 0 24 24" aria-hidden style={{ marginLeft: '4px' }}>
                  <polygon points="6,4 20,12 6,20" fill="white" />
                </svg>
              </span>
            </button>
          )}
        </div>
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


