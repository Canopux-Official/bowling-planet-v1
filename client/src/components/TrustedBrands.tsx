import { type FC } from 'react'
import { useReveal } from '../hooks/useReveal'

const BRANDS = [
  'Roongta Cinema',
  'Woop',
  'Shott',
  'Idea Crate',
  'Playaza',
  'KidZania',
  'Cinemax',
  'Inox',
  'Essel World',
]

const TrustedBrands: FC = () => {
  const ref = useReveal()

  return (
    <section style={{
      background: '#000000',
      padding: '60px 28px',
      position: 'relative',
      overflow: 'hidden',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>

      {/* Subtle ambient glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(95,193,209,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div
        ref={ref}
        className="reveal"
        style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}
      >
        {/* Label */}
        <p style={{
          textAlign: 'center',
          fontFamily: '"Sora", sans-serif',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.25)',
          marginBottom: 40,
        }}>
          Trusted by leading brands across Asia & the Middle East
        </p>

        {/* Brand marquee row */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Left fade */}
          <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: 120,
            background: 'linear-gradient(to right, #000000, transparent)',
            zIndex: 2, pointerEvents: 'none',
          }} />
          {/* Right fade */}
          <div style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: 120,
            background: 'linear-gradient(to left, #000000, transparent)',
            zIndex: 2, pointerEvents: 'none',
          }} />

          {/* Scrolling track — duplicated for seamless loop */}
          <div style={{
            display: 'flex',
            gap: 64,
            animation: 'marquee 22s linear infinite',
            width: 'max-content',
          }}>
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              <div
                key={`${brand}-${i}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  flexShrink: 0,
                }}
              >
                {/* Accent dot */}
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: i % 2 === 0 ? '#5FC1D1' : '#6DBD4E',
                  flexShrink: 0,
                  boxShadow: i % 2 === 0
                    ? '0 0 8px 2px rgba(95,193,209,0.5)'
                    : '0 0 8px 2px rgba(109,189,78,0.5)',
                }} />
                <span style={{
                  fontFamily: '"Sora", sans-serif',
                  fontWeight: 700,
                  fontSize: 17,
                  letterSpacing: '-0.01em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.55)',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.3s',
                }}>
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}

export default TrustedBrands
