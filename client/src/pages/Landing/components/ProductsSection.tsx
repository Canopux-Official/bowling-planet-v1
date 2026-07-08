import { type FC } from 'react'
import { useReveal } from '../../../hooks/useReveal'

const CATEGORIES = [
  {
    id: 'arcade', num: '01',
    title: 'Arcade & Video Games',
    desc: 'Latest-generation skill, racing, and video arcade machines. From classic redemption to immersive 4D experiences — every style of player covered.',
    icon: '🕹',
    count: '200+ Titles',
    color: '#5FC1D1',
    glow: 'rgba(95,193,209,0.08)',
  },
  {
    id: 'major', num: '02',
    title: 'Major Attractions',
    desc: 'Headline centrepieces — bowling lanes, VR arenas, trampoline parks, mini golf, go-kart tracks, cricket simulators, ziplines & rope courses.',
    icon: '🎳',
    count: '30+ Categories',
    color: '#6DBD4E',
    glow: 'rgba(109,189,78,0.08)',
  },
  {
    id: 'redemption', num: '03',
    title: 'Redemption Games',
    desc: 'High-engagement ticket-based games with proven repeat-visit ROI. Data-backed selection to maximise in-venue spend and dwell time.',
    icon: '🎫',
    count: '500+ SKUs',
    color: '#5FC1D1',
    glow: 'rgba(95,193,209,0.08)',
  },
]

const ATTRACTION_TAGS = [
  'Bowling Lanes', 'VR Gaming', 'Mini Golf', 'Trampoline Parks',
  'Go-Kart Tracks', 'Cricket Simulators', 'Ziplines', 'Rope Courses',
  'Soft Play Areas', 'Laser Tag', 'Bumper Cars', 'Rock Climbing',
]

const ProductsSection: FC = () => {
  const titleRef = useReveal()
  const cardsRef = useReveal()
  const tagsRef  = useReveal()

  return (
    <section id="products" style={{ background: '#000000', padding: '80px 28px', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle center glow */}
      <div className="orb orb-teal" style={{ width: 700, height: 500, top: '10%', left: '50%', transform: 'translateX(-50%)' }} />

      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── Title ──────────────────────────────────────── */}
        <div ref={titleRef} className="reveal" style={{ textAlign: 'center', marginBottom: 80 }}>
          <h2 className="font-display text-metallic" style={{
            fontWeight: 800, fontSize: 'clamp(3rem, 6vw, 5rem)',
            letterSpacing: '-0.04em', lineHeight: 1.05,
          }}>
            Our Products.
          </h2>
          <div className="text-gradient-brand" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', fontWeight: 600, marginTop: 16 }}>
            Curated attractions that drive engagement.
          </div>
          <p style={{ fontSize: 16, color: '#86868B', maxWidth: 540, margin: '20px auto 0', lineHeight: 1.7 }}>
            We source and distribute world-class FEC equipment globally — from a single arcade cabinet
            to a complete multi-zone entertainment destination turnkey.
          </p>
        </div>

        {/* ── Cards ──────────────────────────────────────── */}
        <div
          ref={cardsRef}
          className="stagger"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: 20, marginBottom: 60,
          }}
        >
          {CATEGORIES.map(cat => (
            <div
              key={cat.id}
              className="glass-card"
              style={{ padding: '36px 32px', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
            >
              {/* Top gradient accent line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: `linear-gradient(90deg, transparent, ${cat.color}, transparent)`,
                boxShadow: `0 0 12px ${cat.color}80`,
              }} />
              {/* Corner glow */}
              <div aria-hidden="true" style={{
                position: 'absolute', top: 0, right: 0, width: 160, height: 160,
                background: `radial-gradient(circle at top right, ${cat.glow}, transparent 70%)`,
                pointerEvents: 'none',
              }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <span style={{ fontSize: 36 }} aria-hidden="true">{cat.icon}</span>
                <span style={{
                  fontFamily: '"Sora", sans-serif', fontWeight: 700, fontSize: 11,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: cat.color, background: `${cat.color}14`,
                  padding: '5px 12px', borderRadius: 6,
                  border: `1px solid ${cat.color}30`,
                }}>
                  {cat.count}
                </span>
              </div>

              <div style={{ fontFamily: '"Sora",sans-serif', fontWeight: 800, fontSize: 10, color: '#48484A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                {cat.num}
              </div>
              <h3 className="font-display text-metallic" style={{ fontWeight: 700, fontSize: 20, letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: 12 }}>
                {cat.title}
              </h3>
              <p style={{ fontSize: 14, color: '#86868B', lineHeight: 1.65 }}>{cat.desc}</p>
            </div>
          ))}
        </div>

        {/* ── Tags ───────────────────────────────────────── */}
        <div ref={tagsRef} className="reveal" style={{ marginBottom: 52 }}>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#48484A', marginBottom: 16, textAlign: 'center' }}>
            Attraction types we cover
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
            {ATTRACTION_TAGS.map(tag => (
              <span key={tag} style={{
                padding: '7px 16px', borderRadius: 980,
                border: '1px solid rgba(255,255,255,0.07)',
                color: '#86868B', fontSize: 13, fontWeight: 500,
                fontFamily: 'Inter, sans-serif',
                background: 'rgba(255,255,255,0.02)',
                transition: 'all 0.2s ease', cursor: 'default',
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(95,193,209,0.4)'
                  el.style.color = '#5FC1D1'
                  el.style.background = 'rgba(95,193,209,0.05)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.07)'
                  el.style.color = '#86868B'
                  el.style.background = 'rgba(255,255,255,0.02)'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          {/* TODO: connect to /products catalog route */}
          <button
            className="btn btn-primary"
            onClick={() => console.log('TODO: connect to Browse Full Catalog page')}
            aria-label="Browse the full product catalog"
          >
            Browse Full Catalog
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductsSection


