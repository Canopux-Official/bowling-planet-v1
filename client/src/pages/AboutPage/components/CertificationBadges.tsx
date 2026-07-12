import { type FC } from 'react'
import { theme } from '../../../theme'
import { useReveal } from '../../../hooks/useReveal'

const BADGES = [
  { title: 'ISO 9001:2015 Certified', text: 'Quality management systems supporting consistent project delivery and documentation.', icon: '🏅', color: '#5FC1D1' },
  { title: 'Proud IAAPA Member', text: 'Connected to global attractions standards, education and industry best practices.', icon: '🌐', color: '#6DBD4E' },
  { title: 'Authorized Exporter', text: 'Structured sourcing and logistics pathways for international and domestic programmes.', icon: '📦', color: '#C084FC' },
]

const CertificationBadges: FC = () => {
  const headRef = useReveal()
  const gridRef = useReveal()

  return (
    <section style={{ background: theme.colors.void, padding: '80px 28px', position: 'relative', overflow: 'hidden' }}>
      <div className="orb orb-teal" style={{ width: 400, height: 400, bottom: '-10%', right: '-5%', opacity: 0.4 }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="label" style={{ justifyContent: 'center', marginBottom: 20 }}>Credentials</div>
          <h2 className="font-display text-metallic" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>
            Certifications & Memberships.
          </h2>
        </div>

        <div ref={gridRef} className="reveal cert-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {BADGES.map((badge) => (
            <div
              key={badge.title}
              className="glass-card"
              style={{
                padding: '36px 32px',
                borderRadius: 20,
                position: 'relative',
                overflow: 'hidden',
                background: `linear-gradient(135deg, ${badge.color}08, rgba(255,255,255,0.02))`,
                borderColor: `${badge.color}20`,
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${badge.color}, transparent)` }} />
              <div style={{ fontSize: 36, marginBottom: 20 }}>{badge.icon}</div>
              <h3 className="font-display" style={{ fontSize: 17, fontWeight: 700, color: theme.colors.text1, letterSpacing: '-0.02em', marginBottom: 12 }}>{badge.title}</h3>
              <p style={{ color: theme.colors.text2, fontSize: 14, lineHeight: 1.65, fontFamily: theme.typography.fontBody }}>{badge.text}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .cert-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

export default CertificationBadges
