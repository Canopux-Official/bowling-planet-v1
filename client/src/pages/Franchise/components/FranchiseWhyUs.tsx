/**
 * FranchiseWhyUs — "Why Partner with Us?" section
 * Redesigned: Highly visual, text-light, asymmetrical Bento grid.
 */
import { type FC } from 'react'
import { theme } from '../../../theme'
import { useReveal } from '../../../hooks/useReveal'

const PILLARS = [
  {
    id: 'feat-zero',
    title: 'Zero Franchise Fees.',
    subtitle: 'Keep your equity. We earn through results, not entry barriers.',
    icon: '💎',
    color: '#6DBD4E', // Green
  },
  {
    id: 'feat-roi',
    title: '32% Avg. Annual ROI.',
    subtitle: 'Proven, data-driven financial performance across 21+ premium projects.',
    icon: '📈',
    color: '#5FC1D1', // Teal
  },
  {
    id: 'feat-games',
    title: '700+ Global Attractions.',
    subtitle: 'The largest, most diverse entertainment catalogue available in India.',
    icon: '🎮',
    color: '#C084FC', // Purple
  },
  {
    id: 'feat-turnkey',
    title: '100% Turnkey Execution.',
    subtitle: 'From an empty site to your grand opening. We build it, you own it.',
    icon: '🏗️',
    color: '#FFAA33', // Orange
  },
]

const FranchiseWhyUs: FC = () => {
  const headRef = useReveal()
  const gridRef = useReveal()

  return (
    <section
      style={{
        background: theme.colors.surface,
        padding: '40px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="orb orb-teal" style={{ width: 600, height: 600, top: '-10%', right: '-10%' }} />
      <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div ref={headRef} className="reveal" style={{ marginBottom: 24 }}>
          <div className="label" style={{ marginBottom: 8 }}>The Advantage</div>
          <h2 className="font-display text-metallic" style={{
            fontSize: 'clamp(1.35rem, 2.8vw, 1.85rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
          }}>
            Why partners choose us
          </h2>
        </div>

        {/* Highly Visual Bento Grid */}
        <div
          ref={gridRef}
          className="reveal why-bento-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
          }}
        >
          {PILLARS.map((p) => (
            <div
              key={p.id}
              className={`bento-card ${p.id}`}
              style={{
                background: `linear-gradient(135deg, ${p.color}10, rgba(255,255,255,0.02))`,
                border: `1px solid ${p.color}25`,
                borderRadius: 24,
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                position: 'relative',
                overflow: 'hidden',
                minHeight: 160,
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)';
                (e.currentTarget as HTMLElement).style.borderColor = `${p.color}60`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 50px ${p.color}15`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                (e.currentTarget as HTMLElement).style.borderColor = `${p.color}25`;
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              {/* Giant Watermark Icon */}
              <div style={{
                position: 'absolute',
                top: -20,
                right: -20,
                fontSize: 180,
                opacity: 0.08,
                filter: 'grayscale(100%)',
                pointerEvents: 'none',
                userSelect: 'none',
                lineHeight: 1,
                transform: 'rotate(-15deg)',
              }}>
                {p.icon}
              </div>

              {/* Glowing Accent Light */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, height: 4,
                background: `linear-gradient(90deg, ${p.color}, transparent)`,
                opacity: 0.8,
              }} />

              {/* Text Content */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 className="font-display" style={{
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)',
                  fontWeight: 800,
                  color: p.color,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                  marginBottom: 8,
                }}>
                  {p.title}
                </h3>
                <p style={{
                  fontSize: 13,
                  color: theme.colors.text2,
                  fontFamily: theme.typography.fontBody,
                  lineHeight: 1.5,
                  maxWidth: 400,
                }}>
                  {p.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .why-us-header { flex-wrap: wrap; }
        
        /* Desktop Asymmetrical Grid */
        .feat-zero { grid-column: span 1; }
        .feat-roi { grid-column: span 2; }
        .feat-games { grid-column: span 2; }
        .feat-turnkey { grid-column: span 1; }

        @media (max-width: 900px) {
          .why-bento-grid { grid-template-columns: 1fr !important; }
          .feat-zero, .feat-roi, .feat-games, .feat-turnkey { grid-column: span 1 !important; }
        }
        @media (max-width: 600px) {
          .why-us-header > div:last-child { width: 100%; text-align: left; }
          .bento-card { padding: 20px 16px !important; min-height: 140px !important; }
        }
      `}</style>
    </section>
  )
}

export default FranchiseWhyUs

