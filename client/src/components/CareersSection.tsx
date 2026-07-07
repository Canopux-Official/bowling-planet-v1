import { type FC } from 'react'
import { useReveal } from '../hooks/useReveal'

const ROLES = [
  { title: 'Marketing Executive',                    dept: 'Marketing',      type: 'Full-time'  },
  { title: 'Patient Care Assistant (Games Zone)',    dept: 'Operations',     type: 'Full-time'  },
  { title: 'Management Intern — Sales & Operations', dept: 'Operations',     type: 'Internship' },
  { title: 'Receptionist / Office Assistant',        dept: 'Administration', type: 'Full-time'  },
]

const CareersSection: FC = () => {
  const ref = useReveal()

  return (
    <section id="careers" style={{ background: '#000000', padding: '80px 28px', position: 'relative', overflow: 'hidden' }}>
      <div className="orb orb-teal" style={{ width: 500, height: 500, top: '-5%', right: '-5%' }} />

      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        <div ref={ref} className="reveal">
          {/* Header row */}
          <div style={{ textAlign: 'center', marginBottom: 80 }}>
            <h2 className="font-display text-metallic" style={{
              fontWeight: 800, fontSize: 'clamp(3rem, 6vw, 5rem)',
              letterSpacing: '-0.04em', lineHeight: 1.05,
            }}>
              Careers.
            </h2>
            <div className="text-gradient-brand" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', fontWeight: 600, marginTop: 16 }}>
              Build the future of entertainment with us.
            </div>
            <p style={{ fontSize: 16, color: '#86868B', lineHeight: 1.7, maxWidth: 540, margin: '20px auto 0' }}>
              We're a small, ambitious team building India's FEC industry from scratch.
              If you want your work to make people's lives more joyful — we'd love to hear from you.
            </p>
          </div>

          {/* Role list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {ROLES.map(role => (
              <div
                key={role.title}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '24px 28px',
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 12, gap: 16, flexWrap: 'wrap',
                  cursor: 'pointer',
                  transition: 'border-color 0.25s ease, background 0.25s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(95,193,209,0.3)'
                  el.style.background = 'rgba(95,193,209,0.04)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.07)'
                  el.style.background = 'rgba(255,255,255,0.025)'
                }}
              >
                <div>
                  <h3 className="font-display text-metallic" style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.01em', marginBottom: 10 }}>
                    {role.title}
                  </h3>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span style={{
                      fontSize: 11, fontWeight: 600, color: '#5FC1D1',
                      padding: '4px 12px', borderRadius: 4,
                      border: '1px solid rgba(95,193,209,0.25)', background: 'rgba(95,193,209,0.08)',
                      fontFamily: 'Inter,sans-serif', letterSpacing: '0.06em', textTransform: 'uppercase',
                    }}>
                      {role.dept}
                    </span>
                    <span style={{
                      fontSize: 11, fontWeight: 600, color: '#86868B',
                      padding: '4px 12px', borderRadius: 4,
                      border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)',
                      fontFamily: 'Inter,sans-serif',
                    }}>
                      {role.type}
                    </span>
                  </div>
                </div>
                {/* TODO: connect to individual job application pages */}
                <button
                  className="btn btn-link"
                  onClick={() => console.log(`TODO: connect to application for ${role.title}`)}
                  aria-label={`Apply for ${role.title}`}
                >
                  Apply →
                </button>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 64 }}>
            <button
              className="btn btn-ghost"
              onClick={() => console.log('TODO: connect to full careers page')}
              aria-label="View all open positions"
            >
              View All Positions →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CareersSection
