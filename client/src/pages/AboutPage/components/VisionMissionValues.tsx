import { type FC } from 'react'
import { theme } from '../../../theme'
import { useReveal } from '../../../hooks/useReveal'

const VISION =
  'To be the most trusted partner for building and operating Family Entertainment Centers across India and key international markets.'

const MISSION =
  'Deliver complete entertainment programmes — consulting, planning, supply, installation and operations — that create durable commercial outcomes for investors and memorable experiences for guests.'

const VALUES = [
  'Excellence', 'Integrity', 'Client-Centric Approach',
  'Accountability', 'Innovation', 'Safety First',
  'Partnership', 'Operational Discipline',
]

const CARDS = [
  { label: 'Our Vision', text: VISION, color: '#5FC1D1', icon: '🔭' },
  { label: 'Our Mission', text: MISSION, color: '#6DBD4E', icon: '🎯' },
]

const VisionMissionValues: FC = () => {
  const headRef = useReveal()
  const gridRef = useReveal()

  return (
    <section style={{ background: theme.colors.surface, padding: '100px 28px', position: 'relative', overflow: 'hidden' }}>
      <div className="orb orb-teal" style={{ width: 500, height: 500, top: '-10%', right: '-8%', opacity: 0.5 }} />
      <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div ref={headRef} className="reveal" style={{ marginBottom: 56 }}>
          <div className="label" style={{ marginBottom: 20 }}>Who We Are</div>
          <h2 className="font-display text-metallic" style={{
            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
          }}>
            Vision, Mission & Values.
          </h2>
        </div>

        <div ref={gridRef} className="reveal vmv-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          {CARDS.map((card) => (
            <div
              key={card.label}
              style={{
                background: `linear-gradient(135deg, ${card.color}10, rgba(255,255,255,0.02))`,
                border: `1px solid ${card.color}25`,
                borderRadius: 24,
                padding: '40px 36px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${card.color}, transparent)` }} />
              <div style={{ fontSize: 40, marginBottom: 20, opacity: 0.8 }}>{card.icon}</div>
              <h3 className="font-display" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: card.color, marginBottom: 16 }}>{card.label}</h3>
              <p style={{ color: theme.colors.text2, fontSize: 15, lineHeight: 1.7, fontFamily: theme.typography.fontBody }}>{card.text}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.02), transparent)',
          border: `1px solid ${theme.colors.border}`,
          borderRadius: 24,
          padding: '40px 36px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, background: `linear-gradient(90deg, transparent, ${theme.colors.teal}80, transparent)` }} />
          <h3 style={{ fontSize: 13, color: theme.colors.teal, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 28, fontFamily: theme.typography.fontDisplay }}>
            Our Values
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {VALUES.map((value) => (
              <div key={value} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '12px 20px',
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${theme.colors.border}`,
                borderRadius: 10,
                fontSize: 14,
                color: theme.colors.text1,
                fontFamily: theme.typography.fontBody,
                fontWeight: 500,
              }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: theme.colors.teal, boxShadow: `0 0 8px ${theme.colors.teal}` }} />
                {value}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .vmv-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

export default VisionMissionValues
