import { type FC } from 'react'
import { useReveal } from '../../hooks/useReveal'

interface Service {
  id: string; num: string; eyebrow: string; title: string
  desc: string; bullets: string[]; isGreen?: boolean
}

const SERVICES: Service[] = [
  {
    id: 'pre-opening', num: '01',
    eyebrow: 'Phase One',
    title: 'Pre-Opening Set-Up & Consultation',
    desc: 'We partner with you before a single brick is laid — running location analytics, modeling your ROI, designing the optimal floor layout, selecting the right games, and building the team that will make your opening day unforgettable.',
    bullets: [
      'Location analytics & feasibility studies',
      'ROI projections & financial modeling',
      'Optimal layout design & space planning',
      'Game selection & equipment sourcing',
      'Staffing structure & training programs',
      'Agency & regulatory liaison',
      'Grand opening strategy & execution',
    ],
  },
  {
    id: 'operations', num: '02',
    eyebrow: 'Phase Two',
    title: 'Operations Management',
    desc: 'Running a profitable FEC demands operational excellence every day. We design your SOPs, HR frameworks, finance structures, and data-driven marketing engines — then monitor KPIs continuously to keep your ROI compounding.',
    bullets: [
      'SOP design & process documentation',
      'HR frameworks & team structure',
      'Finance structuring & cost optimization',
      'Marketing strategy & digital execution',
      'Safety systems & compliance',
      'Real-time KPI monitoring & reporting',
      'Continuous improvement programs',
    ],
    isGreen: true,
  },
]

const ServicesSection: FC = () => {
  const titleRef  = useReveal()
  const cardsRef  = useReveal()

  return (
    <section
      id="services"
      style={{ background: '#000000', padding: '80px 28px', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background orbs */}
      <div className="orb orb-teal"  style={{ width: 500, height: 500, top: '-10%', left: '-8%',  opacity: 0.4 }} />
      <div className="orb orb-green" style={{ width: 450, height: 450, bottom: '-8%', right: '-6%', opacity: 0.35 }} />

      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── Section Heading ─────────────────────────── */}
        <div ref={titleRef} className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 className="font-display text-metallic" style={{
            fontWeight: 800, fontSize: 'clamp(3rem, 6vw, 5rem)',
            letterSpacing: '-0.04em', lineHeight: 1.05,
          }}>
            Our Services.
          </h2>
          <div className="text-gradient-brand" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', fontWeight: 600, marginTop: 16 }}>
            From blueprint to compounding ROI.
          </div>
        </div>

        {/* ── Cards grid ──────────────────────────────── */}
        <div
          ref={cardsRef}
          className="reveal services-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
          }}
        >
          {SERVICES.map(s => {
            const color  = s.isGreen ? '#6DBD4E' : '#5FC1D1'
            const rgb    = s.isGreen ? '109,189,78' : '95,193,209'
            return (
              <div
                key={s.id}
                style={{
                  borderRadius: 24,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                {/* Top accent bar */}
                <div style={{
                  height: 3,
                  background: s.isGreen
                    ? 'linear-gradient(90deg, #6DBD4E, #5FC1D1)'
                    : 'linear-gradient(90deg, #5FC1D1, #6DBD4E)',
                }} />

                {/* Card body */}
                <div style={{ padding: '36px 36px 32px', flex: 1, display: 'flex', flexDirection: 'column' }}>

                  {/* Number badge + eyebrow */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 44, height: 44, borderRadius: 10,
                      background: `rgba(${rgb},0.1)`,
                      border: `1px solid rgba(${rgb},0.25)`,
                      fontFamily: '"Sora", sans-serif', fontWeight: 800, fontSize: 16,
                      color, flexShrink: 0,
                    }}>
                      {s.num}
                    </div>
                    <span style={{
                      fontFamily: '"Sora", sans-serif', fontSize: 11, fontWeight: 700,
                      letterSpacing: '0.18em', textTransform: 'uppercase', color,
                    }}>
                      {s.eyebrow}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display" style={{
                    fontWeight: 800,
                    fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
                    letterSpacing: '-0.03em', lineHeight: 1.15,
                    color: '#F5F5F7',
                    marginBottom: 16,
                  }}>
                    {s.title}
                  </h3>

                  {/* Description */}
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: '#86868B', marginBottom: 32 }}>
                    {s.desc}
                  </p>

                  {/* Divider */}
                  <div style={{
                    height: 1,
                    background: `linear-gradient(90deg, rgba(${rgb},0.3), transparent)`,
                    marginBottom: 24,
                  }} />

                  {/* Bullet list */}
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
                    {s.bullets.map((b, i) => (
                      <li key={b} style={{
                        display: 'flex', alignItems: 'flex-start', gap: 14,
                        padding: '10px 0',
                        borderBottom: i < s.bullets.length - 1
                          ? '1px solid rgba(255,255,255,0.04)'
                          : 'none',
                      }}>
                        <span style={{
                          fontFamily: '"Sora", sans-serif', fontWeight: 800, fontSize: 10,
                          color, letterSpacing: '0.08em', paddingTop: 3, minWidth: 22, flexShrink: 0,
                        }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span style={{ fontSize: 14, color: '#86868B', lineHeight: 1.6 }}>{b}</span>
                      </li>
                    ))}
                  </ul>

                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default ServicesSection

