import { type FC } from 'react'
import { theme } from '../../../theme'
import { useReveal } from '../../../hooks/useReveal'

const PROPS = [
  { id: 'w1', num: '01', icon: '🎯', title: 'Industry Expertise',            desc: 'Deep operational knowledge across FEC, cinema, and entertainment — not just consulting theory.' },
  { id: 'w2', num: '02', icon: '💡', title: 'Innovative Solutions',          desc: 'We stay ahead of global FEC trends to bring the freshest concepts to your specific market.' },
  { id: 'w3', num: '03', icon: '🏅', title: 'Certified Professionals',       desc: 'Every consultant holds formal qualifications plus years of hands-on venue management.' },
  { id: 'w4', num: '04', icon: '🤝', title: 'Personalized Approach',         desc: 'No cookie-cutter blueprints. Every engagement is scoped and tailored to your goals.' },
  { id: 'w5', num: '05', icon: '⚙️',  title: 'End-to-End Execution',          desc: 'From initial design and procurement to staff training and grand opening operations.' },
  { id: 'w6', num: '06', icon: '📊', title: 'Data-Driven Insights',          desc: 'Every decision backed by real footfall data, spend-per-head metrics, and live KPIs.' },
  { id: 'w7', num: '07', icon: '💰', title: 'ROI Focus',                     desc: 'We measure our success by the profitability of every venue we help build and operate.' },
  { id: 'w8', num: '08', icon: '🔄', title: 'Continuous Monitoring',         desc: 'Our engagement doesn\'t end at opening — we track, report, and improve continuously.' },
]

const WhySection: FC = () => {
  const titleRef = useReveal()
  const gridRef  = useReveal()

  return (
    <section style={{ background: theme.colors.surface, padding: '60px 28px', position: 'relative', overflow: 'hidden' }}>
      <div className="orb orb-teal"  style={{ width: 600, height: 600, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.3 }} />
      <div className="orb orb-purple" style={{ width: 400, height: 400, top: '10%', right: '-10%', opacity: 0.2 }} />
      
      <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none' }} />

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

        {/* Premium Grid */}
        <div
          ref={gridRef}
          className="stagger why-premium-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}
        >
          {PROPS.map((p, i) => {
            const isEven = i % 2 === 0
            const isThird = i % 3 === 0
            
            let color = theme.colors.teal
            if (!isEven) color = theme.colors.green
            if (isThird) color = theme.colors.purple

            return (
              <div
                key={p.id}
                className="glass-card"
                style={{
                  borderRadius: 24,
                  padding: '40px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                  (e.currentTarget as HTMLElement).style.borderColor = `${color}50`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 40px ${color}15`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.05)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {/* Number Watermark */}
                <div style={{
                  position: 'absolute',
                  top: -15,
                  right: -10,
                  fontSize: 120,
                  fontWeight: 900,
                  fontFamily: theme.typography.fontDisplay,
                  color: 'rgba(255,255,255,0.03)',
                  pointerEvents: 'none',
                  userSelect: 'none',
                  lineHeight: 1,
                  zIndex: 0,
                }}>
                  {p.num}
                </div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Glowing Box Icon */}
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: `linear-gradient(135deg, ${color}20, transparent)`,
                    border: `1px solid ${color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 24,
                    fontSize: 22,
                  }}>
                    <span aria-hidden="true" style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.2))' }}>
                      {p.icon}
                    </span>
                  </div>

                  <h3 className="font-display" style={{ 
                    fontWeight: 800, 
                    fontSize: 20, 
                    color: theme.colors.text1,
                    letterSpacing: '-0.01em', 
                    lineHeight: 1.3, 
                    marginBottom: 12 
                  }}>
                    {p.title}
                  </h3>
                  <p style={{ 
                    fontSize: 15, 
                    lineHeight: 1.6, 
                    color: theme.colors.text2,
                    fontFamily: theme.typography.fontBody
                  }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      <style>{`
        @media (max-width: 600px) {
          .why-premium-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

export default WhySection


