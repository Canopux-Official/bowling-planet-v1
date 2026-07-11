import { type FC } from 'react'
import { theme } from '../../../theme'
import { useReveal } from '../../../hooks/useReveal'

const POINTS = [
  { title: 'Industry Expertise', text: 'Deep FEC knowledge across attractions, ops and commercial design.', color: '#5FC1D1' },
  { title: 'Innovative Solutions', text: 'Programme mixes tailored to catchment, capital and brand fit.', color: '#6DBD4E' },
  { title: '17+ Years of Experience', text: 'Delivery history spanning destination and neighbourhood formats.', color: '#C084FC' },
  { title: 'Turnkey Delivery', text: 'Consulting through installation, training and go-live support.', color: '#FFAA33' },
  { title: 'Global Sourcing', text: 'Access to curated attraction and games ecosystems worldwide.', color: '#5FC1D1' },
  { title: 'ROI Focus', text: 'Planning decisions anchored to utilisation and unit economics.', color: '#6DBD4E' },
  { title: 'Safety & Standards', text: 'Installation and ops guidance aligned to safety discipline.', color: '#C084FC' },
  { title: 'Long-term Partnership', text: 'AMC and advisory support after opening, not only handover.', color: '#FFAA33' },
]

const ValueProposition: FC = () => {
  const headRef = useReveal()
  const gridRef = useReveal()

  return (
    <section style={{ background: theme.colors.void, padding: '100px 28px', position: 'relative', overflow: 'hidden' }}>
      <div className="orb orb-green" style={{ width: 600, height: 600, top: '10%', left: '-12%', opacity: 0.45 }} />
      <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.25, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="label" style={{ justifyContent: 'center', marginBottom: 20 }}>The Advantage</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
            <span className="text-metallic" style={{ display: 'block' }}>Why Partners</span>
            <span className="text-metallic" style={{ display: 'block' }}>Choose Us.</span>
          </h2>
        </div>

        <div ref={gridRef} className="reveal vp-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {POINTS.map((point, idx) => (
            <div
              key={point.title}
              style={{
                background: `linear-gradient(180deg, ${point.color}06, rgba(255,255,255,0.01))`,
                border: `1px solid ${point.color}18`,
                borderRadius: 20,
                padding: '32px 24px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = `${point.color}40`
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = `0 12px 32px ${point.color}12`
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = `${point.color}18`
                ;(e.currentTarget as HTMLElement).style.transform = 'none'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${point.color}, transparent)` }} />
              <div style={{ position: 'absolute', top: -10, right: -8, fontFamily: theme.typography.fontDisplay, fontWeight: 900, fontSize: 100, color: `${point.color}07`, lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>
                {String(idx + 1).padStart(2, '0')}
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: theme.colors.text1, letterSpacing: '-0.02em', marginBottom: 10, lineHeight: 1.3 }}>
                  {point.title}
                </h3>
                <p style={{ color: theme.colors.text2, fontSize: 14, lineHeight: 1.6, fontFamily: theme.typography.fontBody }}>
                  {point.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) { .vp-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px)  { .vp-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

export default ValueProposition
