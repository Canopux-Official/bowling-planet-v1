/**
 * FranchiseProcess — 7-step visual journey
 * Redesigned as a sleek grid of glass cards with giant watermark numbers
 */
import { type FC } from 'react'
import { theme } from '../../../theme'
import { useReveal } from '../../../hooks/useReveal'

const STEPS = [
  {
    num: 1,
    title: 'Inquiry & Intro',
    desc: 'Reach out to us. We\'ll schedule a detailed discovery call to understand your vision, location, and investment appetite.',
    icon: '💬',
    color: '#5FC1D1', // Teal
  },
  {
    num: 2,
    title: 'Registrations',
    desc: 'We guide you through company registrations, trade licenses, and all government approvals — hassle-free.',
    icon: '📋',
    color: '#6DBD4E', // Green
  },
  {
    num: 3,
    title: 'Sign LOI',
    desc: 'Sign the Letter of Intent to formalise the partnership and kickstart our full consulting engagement.',
    icon: '✍️',
    color: '#FFAA33', // Orange
  },
  {
    num: 4,
    title: 'Location & ROI',
    desc: 'Our experts analyse your site for foot traffic and deliver a detailed financial projection.',
    icon: '📍',
    color: '#C084FC', // Purple
  },
  {
    num: 5,
    title: 'Franchise Agreement',
    desc: 'Finalise the agreement and make the last fee installment. Your business is officially launched.',
    icon: '🤝',
    color: '#F5C542', // Yellow
  },
  {
    num: 6,
    title: 'Pre-Opening Prep',
    desc: 'Full onboarding: game operations, staff training, marketing setup, and a punch-list for a flawless launch.',
    icon: '🎓',
    color: '#FF5A5F', // Coral Red
  },
  {
    num: 7,
    title: 'Grand Opening',
    desc: 'Your entertainment destination opens its doors. We remain by your side for ongoing operations and growth.',
    icon: '🎉',
    color: '#5FC1D1', // Teal
  },
]

const FranchiseProcess: FC = () => {
  const headRef = useReveal()
  const gridRef = useReveal()

  return (
    <section
      style={{
        background: theme.colors.void,
        padding: '40px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.25, pointerEvents: 'none' }} />
      <div className="orb orb-teal" style={{ width: 600, height: 600, top: '20%', left: '-15%', opacity: 0.5 }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 28 }}>
          <div className="label" style={{ justifyContent: 'center', marginBottom: 8 }}>
            The Journey
          </div>
          <h2 className="font-display text-metallic" style={{
            fontSize: 'clamp(1.35rem, 2.8vw, 1.85rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            marginBottom: 8,
          }}>
            Idea to grand opening
          </h2>
          <p style={{ color: theme.colors.text2, fontSize: 14, maxWidth: 480, margin: '0 auto' }}>
            A clear 7-step playbook from inquiry to launch.
          </p>
        </div>

        {/* Steps Grid */}
        <div 
          ref={gridRef} 
          className="reveal franchise-process-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 12,
          }}
        >
          {STEPS.map((step, idx) => {
            const isLast = idx === STEPS.length - 1
            return (
              <div 
                key={step.num} 
                className="glass-card" 
                style={{ 
                  position: 'relative', 
                  overflow: 'hidden', 
                  padding: '20px 16px', 
                  borderRadius: 16,
                  display: 'flex',
                  flexDirection: 'column',
                  borderTop: `1px solid ${step.color}40`,
                  background: `linear-gradient(180deg, ${step.color}05, rgba(255,255,255,0.01))`,
                  // Make the 7th card span 2 columns on desktop so the grid looks balanced (4 top row, 3 bottom row)
                  gridColumn: isLast ? 'span 2' : 'span 1',
                  textAlign: isLast ? 'center' : 'left',
                  alignItems: isLast ? 'center' : 'flex-start',
                }}
              >
                {/* Giant watermark number */}
                <div style={{
                  position: 'absolute',
                  top: -20, 
                  right: isLast ? '50%' : -10,
                  transform: isLast ? 'translateX(50%)' : 'none',
                  fontSize: 160,
                  fontWeight: 900,
                  color: `${step.color}0A`,
                  fontFamily: theme.typography.fontDisplay,
                  lineHeight: 1,
                  pointerEvents: 'none',
                  userSelect: 'none',
                  zIndex: 0,
                }}>
                  0{step.num}
                </div>

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: 12, 
                    background: `${step.color}1A`, 
                    border: `1px solid ${step.color}33`,
                    color: step.color,
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: 20,
                    marginBottom: 20,
                  }}>
                    {step.icon}
                  </div>
                  
                  <h3 className="font-display" style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: theme.colors.text1,
                    letterSpacing: '-0.02em',
                    marginBottom: 12,
                  }}>
                    <span style={{ color: step.color, marginRight: 6 }}>{step.num}.</span>
                    {step.title}
                  </h3>
                  
                  <p style={{
                    color: theme.colors.text2,
                    fontSize: 14,
                    lineHeight: 1.6,
                    fontFamily: theme.typography.fontBody,
                    flex: 1,
                    maxWidth: isLast ? 400 : 'auto',
                  }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .franchise-process-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .franchise-process-grid > div:last-child { grid-column: span 3 !important; }
        }
        @media (max-width: 768px) {
          .franchise-process-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .franchise-process-grid > div:last-child { grid-column: span 2 !important; }
        }
        @media (max-width: 520px) {
          .franchise-process-grid { grid-template-columns: 1fr !important; }
          .franchise-process-grid > div:last-child { grid-column: span 1 !important; text-align: left !important; align-items: flex-start !important; }
          .franchise-process-grid > div:last-child > div:first-child { right: -10px !important; transform: none !important; }
        }
      `}</style>
    </section>
  )
}

export default FranchiseProcess

