import { type FC } from 'react'
import { useReveal } from '../hooks/useReveal'

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

/* Individual panel — own component so hooks don't live inside .map() */
const ServicePanel: FC<{ s: Service; reverse: boolean }> = ({ s, reverse }) => {
  const ref  = useReveal()
  const color = s.isGreen ? '#6DBD4E' : '#5FC1D1'
  const glowBg = s.isGreen
    ? 'rgba(109,189,78,0.09)'
    : 'rgba(95,193,209,0.09)'

  return (
    <div style={{ background: reverse ? '#0A0A0F' : '#000000', padding: '110px 28px', position: 'relative', overflow: 'hidden' }}>
      {/* Background orb */}
      <div aria-hidden="true" style={{
        position: 'absolute', [reverse ? 'left' : 'right']: '-80px', top: '50%',
        transform: 'translateY(-50%)',
        width: 560, height: 560, borderRadius: '50%',
        background: `radial-gradient(circle, ${glowBg} 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div
        ref={ref}
        className="reveal"
        style={{
          maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 72, alignItems: 'start',
        }}
      >
        {/* Copy block */}
        <div style={{ order: reverse ? 2 : 1 }}>
          {/* Number */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 44, height: 44, borderRadius: 10,
            background: `rgba(${s.isGreen ? '109,189,78' : '95,193,209'},0.1)`,
            border: `1px solid rgba(${s.isGreen ? '109,189,78' : '95,193,209'},0.25)`,
            fontFamily: '"Sora", sans-serif', fontWeight: 800, fontSize: 18,
            color, marginBottom: 20,
          }}>
            {s.num}
          </div>

          <div className={`label ${s.isGreen ? 'label-green' : ''}`} style={{ color, marginBottom: 16 }}>
            {s.eyebrow}
          </div>

          <h2 className="font-display text-metallic" style={{
            fontWeight: 800,
            fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
            letterSpacing: '-0.04em', lineHeight: 1.08, marginBottom: 20,
          }}>
            {s.title}
          </h2>

          <p style={{ fontSize: 15, lineHeight: 1.75, color: '#86868B', maxWidth: 500, marginBottom: 36 }}>
            {s.desc}
          </p>

          {/* TODO: connect to individual service pages */}
          <button
            className="btn btn-ghost"
            onClick={() => console.log(`TODO: connect to ${s.id} service page`)}
            aria-label={`Learn more about ${s.title}`}
            style={{ borderColor: `rgba(${s.isGreen ? '109,189,78' : '95,193,209'},0.3)` }}
          >
            Learn More →
          </button>
        </div>

        {/* Bullet list */}
        <div style={{ order: reverse ? 1 : 2 }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {s.bullets.map((b, i) => (
              <li key={b} style={{
                display: 'flex', alignItems: 'flex-start', gap: 16,
                padding: '17px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}>
                <span style={{
                  fontFamily: '"Sora", sans-serif', fontWeight: 800, fontSize: 10,
                  color, letterSpacing: '0.08em', paddingTop: 3, minWidth: 24,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: 15, color: '#86868B', lineHeight: 1.6 }}>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

const ServicesSection: FC = () => {
  const titleRef = useReveal()
  return (
    <section id="services">
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '80px 28px 40px', position: 'relative', zIndex: 1 }}>
        <div ref={titleRef} style={{ textAlign: 'center' }} className="reveal">
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
      </div>
      {SERVICES.map((s, idx) => (
        <ServicePanel key={s.id} s={s} reverse={idx % 2 === 1} />
      ))}
    </section>
  )
}

export default ServicesSection
