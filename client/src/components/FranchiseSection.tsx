import { type FC } from 'react'
import { useReveal } from '../hooks/useReveal'

const HIGHLIGHTS = [
  { num: '01', title: 'Attractive ROI',     desc: 'Transparent financial models backed by real venue data — know exactly what to expect before you invest a rupee.' },
  { num: '02', title: 'Less Competition',   desc: 'Premium FEC franchises in high-growth tier-2 and tier-3 cities with wide-open, first-mover opportunity.' },
  { num: '03', title: 'Long-Term Support',  desc: 'Our partnership doesn\'t end at opening. Ongoing coaching, co-branding, and growing network benefits.' },
  { num: '04', title: 'Full-Stack Partner', desc: 'Site selection to grand opening and beyond — we are your operational backbone at every stage of growth.' },
]

const FranchiseSection: FC = () => {
  const ref = useReveal()

  return (
    <section id="franchise" style={{ background: '#0A0A0F', padding: '80px 28px', position: 'relative', overflow: 'hidden' }}>

      {/* Glow orbs */}
      <div className="orb orb-green" style={{ width: 700, height: 600, top: '-20%', right: '-10%' }} />
      <div className="orb orb-teal"  style={{ width: 500, height: 500, bottom: '-15%', left: '-8%' }} />

      {/* Grid pattern */}
      <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.6, pointerEvents: 'none' }} />

      <div className="divider-teal" style={{ marginBottom: 80 }} />

      <div
        ref={ref}
        className="reveal"
        style={{
          maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1,
        }}
      >
        {/* ── Title ──────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <h2 className="font-display text-metallic" style={{
            fontWeight: 800, fontSize: 'clamp(3rem, 6vw, 5rem)',
            letterSpacing: '-0.04em', lineHeight: 1.05,
          }}>
            Franchise Opportunity.
          </h2>
          <div className="text-gradient-brand" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', fontWeight: 600, marginTop: 16 }}>
            Start India's Most Exciting Games Zone.
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 80, alignItems: 'start',
        }}>
          {/* ── Left: CTAs ──────────────────────── */}
          <div>

          <p style={{ fontSize: 16, lineHeight: 1.75, color: '#86868B', maxWidth: 460, marginBottom: 40 }}>
            Join a growing network of family entertainment entrepreneurs. We provide
            everything — from vision and equipment to the operational playbook that
            makes your venue thrive from day one.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {/* TODO: connect to /franchise-apply route */}
            <button
              className="btn btn-primary btn-primary-green"
              onClick={() => console.log('TODO: connect to Apply for Franchise page')}
              aria-label="Apply for a Bowling Planet franchise"
            >
              Apply for Franchise
            </button>
            {/* TODO: connect to /franchise-info route */}
            <button
              className="btn btn-ghost"
              onClick={() => console.log('TODO: connect to franchise info page')}
              aria-label="Download franchise info pack"
            >
              Info Pack →
            </button>
          </div>
        </div>

        {/* ── Right: highlight grid ──────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 2,
          background: 'rgba(255,255,255,0.04)',
          borderRadius: 16, overflow: 'hidden',
        }}>
          {HIGHLIGHTS.map(h => (
            <div
              key={h.num}
              className="feat-card"
              style={{ borderRadius: 0, border: 'none', padding: '28px 24px' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1A1A24' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#111118' }}
            >
              <div style={{
                fontFamily: '"Sora", sans-serif', fontWeight: 800, fontSize: 10,
                color: '#6DBD4E', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12,
              }}>
                {h.num}
              </div>
              <h3 className="font-display text-metallic" style={{ fontWeight: 700, fontSize: 16, letterSpacing: '-0.01em', lineHeight: 1.3, marginBottom: 10 }}>
                {h.title}
              </h3>
              <p style={{ fontSize: 13, color: '#86868B', lineHeight: 1.65 }}>{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
      </div>

      <div className="divider" style={{ marginTop: 80 }} />
    </section>
  )
}

export default FranchiseSection
