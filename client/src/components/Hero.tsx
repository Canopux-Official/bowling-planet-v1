/**
 * Hero — Static cinematic hero section (Replaces the scroll animation)
 *
 * Keeps the dark atmospheric Apple Vision Pro aesthetic:
 * - Pure black background
 * - Neon teal and green orbs
 * - Grid pattern
 * - Sora metallic/neon heading
 */

import { type FC, Suspense } from 'react'
import { useReveal } from '../hooks/useReveal'
import Hero3DScene from './Hero3DScene'

const Hero: FC = () => {
  const ref = useReveal(0.1)

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 64, // to account for sticky nav
      }}
    >
      {/* ── Background Glow Orbs ──────────────────────────── */}
      <div
        className="orb orb-teal"
        style={{
          width: '60vw',
          height: '60vw',
          maxWidth: 1000,
          maxHeight: 1000,
          top: '-20%',
          left: '-15%',
          opacity: 0.8,
        }}
      />
      <div
        className="orb orb-green"
        style={{
          width: '55vw',
          height: '55vw',
          maxWidth: 900,
          maxHeight: 900,
          bottom: '-25%',
          right: '-10%',
          opacity: 0.8,
        }}
      />

      {/* ── Grid overlay ────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="grid-bg"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />

      {/* ── 3D Scene ────────────────────────────────────── */}
      <Suspense fallback={null}>
        <Hero3DScene />
      </Suspense>

      {/* ── Content ─────────────────────────────────────── */}
      <div
        ref={ref}
        className="stagger"
        style={{
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: 960,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          className="label"
          style={{ justifyContent: 'center', marginBottom: 24 }}
        >
          FEC Consulting · Equipment · Franchise
        </div>

        <h1
          className="font-display"
          style={{
            fontWeight: 800,
            fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
            letterSpacing: '-0.04em',
            lineHeight: 1.02,
            transitionDelay: '100ms',
          }}
        >
          <span className="text-metallic" style={{ display: 'block' }}>Building India's</span>
          <span className="text-gradient-brand" style={{ display: 'block' }}>Next Great</span>
          <span className="text-metallic" style={{ display: 'block' }}>Entertainment</span>
          <span className="text-metallic" style={{ display: 'block' }}>Destination.</span>
        </h1>

        <p
          style={{
            color: '#86868B',
            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
            lineHeight: 1.65,
            maxWidth: 600,
            margin: '24px auto 40px',
            fontFamily: '"Inter", sans-serif',
            transitionDelay: '200ms',
          }}
        >
          From bowling alleys and VR arenas to arcade floors — we design, equip, and operate world-class family entertainment centers.
        </p>

        <div
          style={{
            display: 'flex',
            gap: 14,
            justifyContent: 'center',
            flexWrap: 'wrap',
            transitionDelay: '300ms',
          }}
        >
          <button
            className="btn btn-primary"
            onClick={() => console.log('TODO: connect to Start Your Project page')}
            aria-label="Start your FEC project"
          >
            Start Your Project
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => document.getElementById('franchise')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Explore franchise opportunities"
          >
            Explore Franchise
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
