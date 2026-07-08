/**
 * Hero — Cinematic hero with rotating activity ticker
 */

import { type FC, Suspense, useState, useEffect } from 'react'
import { useReveal } from '../../hooks/useReveal'
import Hero3DScene from './Hero3DScene'

const ACTIVITIES = [
  'Bowling Lanes',
  'VR Gaming',
  'Mini Golf',
  'Trampoline Parks',
  'Go-Kart Tracks',
  'Cricket Simulators',
  'Ziplines',
  'Rope Courses',
  'Soft Play Areas',
  'Laser Tag',
  'Bumper Cars',
  'Rock Climbing',
]

/** Rotating activity word in the hero heading */
const RotatingWord: FC = () => {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx(i => (i + 1) % ACTIVITIES.length)
        setVisible(true)
      }, 350)
    }, 2200)
    return () => clearInterval(cycle)
  }, [])

  return (
    <span
      className="text-gradient-brand"
      style={{
        display: 'inline-block',
        whiteSpace: 'nowrap',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}
    >
      {ACTIVITIES[idx]}
    </span>
  )
}

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
        paddingTop: 64,
      }}
    >
      {/* ── Background Glow Orbs ──────────────────────────── */}
      <div className="orb orb-teal" style={{ width: '60vw', height: '60vw', maxWidth: 1000, maxHeight: 1000, top: '-20%', left: '-15%', opacity: 0.8 }} />
      <div className="orb orb-green" style={{ width: '55vw', height: '55vw', maxWidth: 900, maxHeight: 900, bottom: '-25%', right: '-10%', opacity: 0.8 }} />

      {/* ── Grid overlay ─────────────────────────────────── */}
      <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />

      {/* ── 3D Scene ─────────────────────────────────────── */}
      <Suspense fallback={null}>
        <Hero3DScene />
      </Suspense>

      {/* ── Content ──────────────────────────────────────── */}
      <div
        ref={ref}
        className="stagger"
        style={{ textAlign: 'center', padding: '0 24px', maxWidth: 960, position: 'relative', zIndex: 1 }}
      >
        <div className="label" style={{ justifyContent: 'center', marginBottom: 24 }}>
          FEC Consulting · Equipment · Franchise
        </div>

        <h1
          className="font-display"
          style={{
            fontWeight: 800,
            fontSize: 'clamp(2.2rem, 5.5vw, 5.5rem)',
            letterSpacing: '-0.04em',
            lineHeight: 1.12,
            transitionDelay: '100ms',
          }}
        >
          <span className="text-metallic" style={{ display: 'block' }}>India's Best</span>
          {/* Fixed-height line so the layout never shifts when word length changes */}
          <span style={{
            display: 'block',
            height: 'clamp(3rem, 6.6vw, 6.6rem)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <RotatingWord />
          </span>
          <span className="text-metallic" style={{ display: 'block' }}>Experience.</span>
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
          From bowling alleys and VR arenas to go-kart tracks and trampoline parks — we design, equip, and operate world-class family entertainment centers.
        </p>

        {/* ── Activity chips row ───────────────────────── */}
        <div
          style={{
            display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap',
            marginBottom: 40, transitionDelay: '250ms',
          }}
        >
          {ACTIVITIES.slice(0, 6).map(a => (
            <div key={a} style={{
              padding: '5px 14px',
              borderRadius: 100,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.09)',
              fontFamily: '"Sora", sans-serif',
              fontSize: 11, fontWeight: 600,
              letterSpacing: '0.06em',
              color: 'rgba(255,255,255,0.4)',
            }}>
              {a}
            </div>
          ))}
          <div style={{
            padding: '5px 14px', borderRadius: 100,
            background: 'rgba(95,193,209,0.08)',
            border: '1px solid rgba(95,193,209,0.2)',
            fontFamily: '"Sora", sans-serif',
            fontSize: 11, fontWeight: 600,
            letterSpacing: '0.06em',
            color: '#5FC1D1',
          }}>
            +6 more
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', transitionDelay: '300ms' }}>
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

