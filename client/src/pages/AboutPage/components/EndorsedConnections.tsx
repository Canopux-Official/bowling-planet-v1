import { type FC } from 'react'
import { theme } from '../../../theme'
import { useReveal } from '../../../hooks/useReveal'

const PARTNERS = [
  { name: 'IAAPA', color: '#5FC1D1' },
  { name: 'ISO', color: '#6DBD4E' },
  { name: 'AES', color: '#5FC1D1' },
  { name: 'RAW', color: '#6DBD4E' },
  { name: 'UNIS', color: '#C084FC' },
  { name: 'SEGA', color: '#FFAA33' },
  { name: 'AMF', color: '#5FC1D1' },
  { name: 'Qubica', color: '#6DBD4E' },
]

const EndorsedConnections: FC = () => {
  const headRef = useReveal()
  const rowRef = useReveal()

  return (
    <section style={{ background: theme.colors.surface, padding: '80px 28px', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.25, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div ref={headRef} className="reveal" style={{ marginBottom: 48 }}>
          <div className="label" style={{ justifyContent: 'center', marginBottom: 20 }}>Global Network</div>
          <h2 className="font-display text-metallic" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>
            Endorsed Connections.
          </h2>
        </div>

        <div ref={rowRef} className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '16px 28px',
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid rgba(255,255,255,0.08)`,
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 700,
                color: theme.colors.text1,
                fontFamily: theme.typography.fontDisplay,
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = `${partner.color}10`
                ;(e.currentTarget as HTMLElement).style.borderColor = `${partner.color}50`
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${partner.color}15`
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'
                ;(e.currentTarget as HTMLElement).style.transform = 'none'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: partner.color, boxShadow: `0 0 10px ${partner.color}` }} />
              {partner.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EndorsedConnections
