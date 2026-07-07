import { type FC } from 'react'
import { useReveal } from '../hooks/useReveal'

const TrustedBrands: FC = () => {
  const footRef = useReveal()

  return (
    <section style={{ background: '#000000', padding: '40px 28px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* ── Logos / Partners row ────────────────────────── */}
        <div
          ref={footRef}
          className="reveal"
          style={{
            display: 'flex', flexWrap: 'wrap', gap: 40,
            alignItems: 'center', justifyContent: 'center'
          }}
        >
          <div style={{ width: '100%', textAlign: 'center', color: '#86868B', fontSize: 13, marginBottom: 8, letterSpacing: '0.04em' }}>
            TRUSTED BY BRANDS ACROSS ASIA & MIDDLE EAST
          </div>
          {['Roongta Cinema', 'Woop', 'Shott', 'Idea Crate', 'Playaza', 'KidZania'].map(brand => (
            <div key={brand} style={{
              fontFamily: '"Sora", sans-serif', fontWeight: 800, fontSize: 20,
              color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase',
              letterSpacing: '-0.02em',
            }}>
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustedBrands
