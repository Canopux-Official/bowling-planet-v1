import { type FC } from 'react'
import { theme } from '../../../theme'
import { useReveal } from '../../../hooks/useReveal'

const PILLARS = [
  { icon: '🏗️', label: '21+ Projects', sub: 'High-end FECs delivered' },
  { icon: '🎮', label: '700+ Games', sub: 'Curated global catalogue' },
  { icon: '📈', label: '32% ROI', sub: 'Avg. annual return' },
  { icon: '🌐', label: '17+ Years', sub: 'Industry experience' },
]

const AboutHero: FC = () => {
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
      <div className="orb orb-teal" style={{ width: 700, height: 600, top: '-20%', left: '50%', transform: 'translateX(-50%)', opacity: 0.55 }} />
      <div className="orb orb-green" style={{ width: 350, height: 350, bottom: '-5%', right: '-5%' }} />
      <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div className="label" style={{ justifyContent: 'center', marginBottom: 28 }}>
          About Bowling Planet
        </div>

        <div ref={headRef} className="reveal">
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              marginBottom: 28,
            }}
          >
            <span className="text-metallic" style={{ display: 'block' }}>India's Leading</span>
            <span className="text-gradient-brand" style={{ display: 'block' }}>Entertainment</span>
            <span className="text-metallic" style={{ display: 'block' }}>Destination Builders.</span>
          </h1>

          <p style={{
            fontSize: 18,
            color: theme.colors.text2,
            maxWidth: 600,
            margin: '0 auto 52px',
            lineHeight: 1.75,
            fontFamily: theme.typography.fontBody,
          }}>
            From an empty site to grand opening — we consult, plan, supply and install world-class
            Family Entertainment Centers for malls, hotels, resorts and investors.
          </p>
        </div>

        <div ref={gridRef} className="reveal about-hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 14,
          marginTop: 60,
        }}>
          {PILLARS.map((p) => (
            <div key={p.label} className="glass-card" style={{ padding: '22px 18px', textAlign: 'left', borderRadius: 16 }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{p.icon}</div>
              <div style={{ fontFamily: theme.typography.fontDisplay, fontWeight: 700, fontSize: 14, color: theme.colors.text1, marginBottom: 4 }}>{p.label}</div>
              <div style={{ fontSize: 12, color: theme.colors.text3, fontFamily: theme.typography.fontBody, lineHeight: 1.5 }}>{p.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .about-hero-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 520px)  { .about-hero-grid { grid-template-columns: 1fr 1fr !important; gap: 10px !important; } }
      `}</style>
    </section>
  )
}

export default AboutHero
