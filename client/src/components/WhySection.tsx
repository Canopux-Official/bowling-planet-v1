import { type FC } from 'react'
import { useReveal } from '../hooks/useReveal'

const PROPS = [
  { num: '01', icon: '🎯', title: 'Industry Expertise',            desc: 'Deep operational knowledge across FEC, cinema, and entertainment — not just consulting theory.' },
  { num: '02', icon: '💡', title: 'Innovative Solutions',          desc: 'We stay ahead of global FEC trends to bring the freshest concepts to your specific market.' },
  { num: '03', icon: '🏅', title: 'Certified Professionals',       desc: 'Every consultant holds formal qualifications plus years of hands-on venue management.' },
  { num: '04', icon: '🤝', title: 'Personalized Approach',         desc: 'No cookie-cutter blueprints. Every engagement is scoped and tailored to your goals.' },
  { num: '05', icon: '📅', title: '17+ Years Experience',          desc: 'Accumulated knowledge from managing venues serving millions of families across India.' },
  { num: '06', icon: '📊', title: 'Data-Driven Insights',          desc: 'Every decision backed by real footfall data, spend-per-head metrics, and live KPIs.' },
  { num: '07', icon: '💰', title: 'ROI Focus',                     desc: 'We measure our success by the profitability of every venue we help build and operate.' },
  { num: '08', icon: '🔄', title: 'Continuous Monitoring',         desc: 'Our engagement doesn\'t end at opening — we track, report, and improve continuously.' },
]

const WhySection: FC = () => {
  const titleRef = useReveal()
  const gridRef  = useReveal()

  return (
    <section style={{ background: '#0A0A0F', padding: '80px 28px', position: 'relative', overflow: 'hidden' }}>
      <div className="orb orb-teal"  style={{ width: 600, height: 600, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />

      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Title */}
        <div ref={titleRef} className="reveal" style={{ textAlign: 'center', marginBottom: 80 }}>
          <h2 className="font-display text-metallic" style={{
            fontWeight: 800, fontSize: 'clamp(3rem, 6vw, 5rem)',
            letterSpacing: '-0.04em', lineHeight: 1.05,
          }}>
            Why Choose Us.
          </h2>
          <div className="text-gradient-brand" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', fontWeight: 600, marginTop: 16 }}>
            Eight reasons industry leaders choose Bowling Planet.
          </div>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="stagger"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 2,
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 20, overflow: 'hidden',
          }}
        >
          {PROPS.map((p, i) => {
            const isTeal  = i % 2 === 0
            const accent  = isTeal ? '#5FC1D1' : '#6DBD4E'
            const glowBg  = isTeal ? 'rgba(95,193,209,0.06)' : 'rgba(109,189,78,0.05)'
            return (
              <div
                key={p.title}
                className="feat-card"
                style={{ borderRadius: 0, border: 'none', padding: '32px 28px', position: 'relative', overflow: 'hidden' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1A1A24' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#111118' }}
              >
                {/* Corner accent glow */}
                <div aria-hidden="true" style={{
                  position: 'absolute', bottom: 0, right: 0,
                  width: 80, height: 80,
                  background: `radial-gradient(circle at bottom right, ${glowBg}, transparent 70%)`,
                  pointerEvents: 'none',
                }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <span style={{ fontSize: 22 }} aria-hidden="true">{p.icon}</span>
                  <span style={{
                    fontFamily: '"Sora", sans-serif', fontWeight: 800, fontSize: 10,
                    color: accent, letterSpacing: '0.12em', textTransform: 'uppercase',
                  }}>
                    {p.num}
                  </span>
                </div>

                <h3 className="font-display text-metallic" style={{ fontWeight: 700, fontSize: 17, letterSpacing: '-0.01em', lineHeight: 1.3, marginBottom: 10 }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: 13, lineHeight: 1.65, color: '#86868B' }}>{p.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhySection
