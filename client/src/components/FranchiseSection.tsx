import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { theme } from '../theme'
import { useReveal } from '../hooks/useReveal'

const HIGHLIGHTS = [
  {
    id: 'feat-1',
    num: '01',
    title: 'Attractive ROI',
    subtitle: 'Transparent financial models backed by real venue data — know exactly what to expect before you invest a rupee.',
    color: '#5FC1D1', // Teal
  },
  {
    id: 'feat-2',
    num: '02',
    title: 'Less Competition',
    subtitle: 'Premium FEC franchises in high-growth tier-2 and tier-3 cities with wide-open, first-mover opportunity.',
    color: '#6DBD4E', // Green
  },
  {
    id: 'feat-3',
    num: '03',
    title: 'Long-Term Support',
    subtitle: 'Our partnership doesn\'t end at opening. Ongoing coaching, co-branding, and growing network benefits.',
    color: '#C084FC', // Purple
  },
  {
    id: 'feat-4',
    num: '04',
    title: 'Full-Stack Partner',
    subtitle: 'Site selection to grand opening and beyond — we are your operational backbone at every stage of growth.',
    color: '#FFAA33', // Orange
  },
]

const FranchiseSection: FC = () => {
  const ref = useReveal()

  return (
    <section id="franchise" style={{ background: '#0A0A0F', padding: '120px 28px', position: 'relative', overflow: 'hidden' }}>

      {/* Glow orbs */}
      <div className="orb orb-green" style={{ width: 700, height: 600, top: '-20%', right: '-10%' }} />
      <div className="orb orb-teal" style={{ width: 500, height: 500, bottom: '-15%', left: '-8%' }} />

      {/* Grid pattern */}
      <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none' }} />

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

        <div
          className="franchise-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 80, alignItems: 'start',
          }}>
          
          {/* ── Left: CTAs ──────────────────────── */}
          <div>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: '#86868B', maxWidth: 460, marginBottom: 40, fontFamily: theme.typography.fontBody }}>
              Join a growing network of family entertainment entrepreneurs. We provide
              everything — from vision and equipment to the operational playbook that
              makes your venue thrive from day one.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link to="/franchise" className="btn btn-primary btn-primary-green" style={{ textDecoration: 'none' }}>
                Explore Franchise
              </Link>
              <Link to="/contact" className="btn btn-ghost" style={{ textDecoration: 'none' }}>
                Apply Now →
              </Link>
            </div>
          </div>

          {/* ── Right: premium highlight grid ──────────────────────── */}
          <div
            className="franchise-highlights"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 16,
            }}
          >
            {HIGHLIGHTS.map(p => (
              <div
                key={p.id}
                className="bento-card"
                style={{
                  background: `linear-gradient(135deg, ${p.color}10, rgba(255,255,255,0.02))`,
                  border: `1px solid ${p.color}25`,
                  borderRadius: 20,
                  padding: '32px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLElement).style.borderColor = `${p.color}60`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 15px 40px ${p.color}15`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.borderColor = `${p.color}25`;
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {/* Giant Watermark Number */}
                <div style={{
                  position: 'absolute',
                  top: -20,
                  right: -10,
                  fontSize: 140,
                  fontWeight: 900,
                  fontFamily: theme.typography.fontDisplay,
                  color: `${p.color}10`,
                  pointerEvents: 'none',
                  userSelect: 'none',
                  lineHeight: 1,
                  zIndex: 0,
                }}>
                  {p.num}
                </div>

                {/* Glowing Accent Light */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, height: 3,
                  background: `linear-gradient(90deg, ${p.color}, transparent)`,
                  opacity: 0.8,
                }} />

                {/* Text Content */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3 className="font-display" style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: p.color,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    marginBottom: 12,
                  }}>
                    {p.title}
                  </h3>
                  <p style={{
                    fontSize: 14,
                    color: theme.colors.text1,
                    fontFamily: theme.typography.fontBody,
                    lineHeight: 1.6,
                  }}>
                    {p.subtitle}
                  </p>
                </div>
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
