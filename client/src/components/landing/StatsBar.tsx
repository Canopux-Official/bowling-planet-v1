import { type FC } from 'react'
import { useReveal } from '../../hooks/useReveal'

const STATS = [
  { num: '17+',  label: 'Years of Experience' },
  { num: '700+', label: 'Products & Equipment' },
  { num: '50+',  label: 'Projects Delivered'   },
  { num: '10+',  label: 'Cities Served'         },
]

const StatsBar: FC = () => {
  const ref = useReveal(0.1)

  return (
    <section style={{ background: '#0A0A0F', position: 'relative' }}>
      <div className="divider-teal" />
      <div
        ref={ref}
        className="stagger stats-grid"
        style={{
          maxWidth: 1320, margin: '0 auto', padding: '0 28px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}
      >
        {STATS.map((s, i) => (
          <div
            key={s.num}
            style={{
              padding: '40px 16px', textAlign: 'center',
              borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
            }}
          >
            <div className="stat-num">{s.num}</div>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500,
              color: '#48484A', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 8,
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
      <div className="divider" />
    </section>
  )
}

export default StatsBar

