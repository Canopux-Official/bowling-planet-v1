/**
 * Franchise Hero — The first impression
 * Large cinematic headline with key value props in a visual grid
 */
import { type FC } from 'react'
import { theme } from '../../theme'
import { useReveal } from '../../hooks/useReveal'

const VALUE_PROPS = [
  { icon: '📈', label: 'Attractive ROI', sub: '32% avg. annual return' },
  { icon: '🚀', label: 'Fastest Growing Industry', sub: 'FEC market expanding rapidly' },
  { icon: '🎯', label: 'Flexible Business Model', sub: 'Economy to Deluxe tiers' },
  { icon: '🎮', label: '700+ Games', sub: 'Curated entertainment tech' },
  { icon: '💸', label: 'Zero Franchise Fees', sub: 'No entry barrier' },
  { icon: '🏆', label: '17+ Years Experience', sub: 'Proven partner since day one' },
  { icon: '👨‍👩‍👧‍👦', label: 'Youth & Family Appeal', sub: 'Universal audience, loyal repeat visits' },
  { icon: '🌐', label: 'Long-Term Business Model', sub: 'Built for scale & sustainability' },
]

const FranchiseHero: FC = () => {
  const headRef = useReveal()
  const gridRef = useReveal()

  return (
    <section
      style={{
        background: theme.colors.void,
        padding: '140px 28px 100px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background orbs */}
      <div className="orb orb-teal" style={{ width: 800, height: 700, top: '-25%', left: '50%', transform: 'translateX(-50%)', opacity: 0.6 }} />
      <div className="orb orb-green" style={{ width: 400, height: 400, bottom: '-10%', right: '-5%' }} />
      <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Eyebrow */}
        <div className="label" style={{ justifyContent: 'center', marginBottom: 28 }}>
          FEC Franchise Business Model
        </div>

        {/* Headline */}
        <div ref={headRef} className="reveal">
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(2.6rem, 6.5vw, 5.5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              marginBottom: 28,
            }}
          >
            <span className="text-metallic" style={{ display: 'block' }}>Own India's Most</span>
            <span className="text-gradient-brand" style={{ display: 'block' }}>Exciting Entertainment</span>
            <span className="text-metallic" style={{ display: 'block' }}>Business.</span>
          </h1>

          <p style={{
            fontSize: 18,
            color: theme.colors.text2,
            maxWidth: 580,
            margin: '0 auto 52px',
            lineHeight: 1.75,
            fontFamily: theme.typography.fontBody,
          }}>
            Partner with Bowling Planet — India's leading FEC consultant — and open your dream game zone
            with full support, proven systems, and a guaranteed path to profit.
          </p>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="#apply"
              className="btn btn-primary"
              style={{ fontSize: 16, padding: '16px 38px' }}
            >
              Apply for Franchise →
            </a>
            <a
              href="#investment"
              className="btn btn-ghost"
              style={{ fontSize: 16, padding: '15px 38px' }}
            >
              View Investment Models
            </a>
          </div>
        </div>

        {/* Value props grid */}
        <div
          ref={gridRef}
          className="reveal franchise-hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 14,
            marginTop: 80,
          }}
        >
          {VALUE_PROPS.map((vp) => (
            <div
              key={vp.label}
              className="glass-card"
              style={{
                padding: '22px 18px',
                textAlign: 'left',
                borderRadius: 16,
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 10 }}>{vp.icon}</div>
              <div style={{
                fontFamily: theme.typography.fontDisplay,
                fontWeight: 700,
                fontSize: 14,
                color: theme.colors.text1,
                marginBottom: 4,
                lineHeight: 1.3,
              }}>{vp.label}</div>
              <div style={{
                fontSize: 12,
                color: theme.colors.text3,
                fontFamily: theme.typography.fontBody,
                lineHeight: 1.5,
              }}>{vp.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .franchise-hero-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 520px) {
          .franchise-hero-grid { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
        }
      `}</style>
    </section>
  )
}

export default FranchiseHero
