import { type FC } from 'react'
import { useReveal } from '../hooks/useReveal'

const FEC_BRANDS   = ['Woop', 'Shott', 'Idea Crate', 'Playaza', 'KidZania', 'Essel World']
const CINEMA_BRANDS = ['Cinemax', 'Inox', 'Roongta Group']

const AboutSection: FC = () => {
  const titleRef = useReveal()
  const leftRef  = useReveal()
  const rightRef = useReveal()

  return (
    <section
      id="about"
      style={{ background: '#000000', padding: '80px 28px', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background glow orbs */}
      <div className="orb orb-teal"  style={{ width: 500, height: 500, top: '-10%', right: '-5%' }} />
      <div className="orb orb-green" style={{ width: 400, height: 400, bottom: '-5%', left: '-8%' }} />

      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── Section Heading ────────────────────────────── */}
        <div ref={titleRef} style={{ textAlign: 'center', marginBottom: 80 }} className="reveal">
          <h2 className="font-display text-metallic" style={{
            fontWeight: 800, fontSize: 'clamp(3rem, 6vw, 5rem)',
            letterSpacing: '-0.04em', lineHeight: 1.05,
          }}>
            Our Story.
          </h2>
          <div className="text-gradient-brand" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', fontWeight: 600, marginTop: 16 }}>
            Seventeen years of industry mastery.
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 80, alignItems: 'center',
        }}>

        {/* ── Portrait card ──────────────────────────────── */}
        <div ref={leftRef} className="reveal-left">
          <div style={{ position: 'relative', maxWidth: 440, margin: '0 auto' }}>

            {/* Card */}
            <div className="glass-card" style={{
              width: '100%', aspectRatio: '4/5', overflow: 'hidden',
              position: 'relative', background: 'rgba(255,255,255,0.02)',
            }}>
              {/* Top accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: 'linear-gradient(90deg, #5FC1D1, #6DBD4E)',
              }} />
              {/* Interior atmosphere */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 50% 40%, rgba(95,193,209,0.06) 0%, transparent 60%)',
              }} />
              {/* Grid inside card */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }} />
              {/* Name plate */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 28px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.95), transparent)',
              }}>
                <p style={{ fontFamily: '"Sora", sans-serif', fontWeight: 700, fontSize: 22, color: '#F5F5F7', letterSpacing: '-0.02em', marginBottom: 4 }}>
                  Ranjith Pillai
                </p>
                <p className="label" style={{ fontSize: 11 }}>Founder & Managing Director</p>
              </div>
            </div>

            {/* Floating badge */}
            <div style={{
              position: 'absolute', top: -16, right: -16,
              background: 'linear-gradient(135deg, #5FC1D1 0%, #4AAFBF 100%)',
              color: '#000', padding: '10px 18px', borderRadius: 8,
              fontFamily: '"Sora", sans-serif', fontWeight: 700, fontSize: 13,
              letterSpacing: '0.04em', textTransform: 'uppercase',
              boxShadow: '0 8px 24px rgba(95,193,209,0.35)',
              animation: 'float 4s ease-in-out infinite',
            }}>
              Est. 2020
            </div>
          </div>
        </div>

        {/* ── Copy ───────────────────────────────────────── */}
        <div ref={rightRef} className="reveal-right">
          <blockquote style={{
            borderLeft: '2px solid #5FC1D1', paddingLeft: 20,
            fontFamily: '"Sora", sans-serif', fontStyle: 'italic',
            fontSize: 'clamp(1rem, 1.6vw, 1.2rem)', fontWeight: 600,
            color: '#F5F5F7', lineHeight: 1.55, marginBottom: 28,
            boxShadow: '-6px 0 20px rgba(95,193,209,0.1)',
          }}>
            "Great entertainment centers don't happen by accident. They are engineered —
            with data, design, and seventeen years of hard-won insight."
          </blockquote>

          <p style={{ fontSize: 15, lineHeight: 1.75, color: '#86868B', marginBottom: 32, maxWidth: 500 }}>
            Bowling Planet was founded in 2020 by <strong style={{ color: '#F5F5F7', fontWeight: 600 }}>Ranjith Pillai</strong>, a veteran
            of India's family entertainment and cinema industries. His career spans some of the
            country's most recognizable FEC and cinema brands.
          </p>

          {/* Brand columns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40 }}>
            {[
              { title: 'FEC Track Record', items: FEC_BRANDS },
              { title: 'Cinema Industry',  items: CINEMA_BRANDS },
            ].map(col => (
              <div key={col.title}>
                <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#48484A', marginBottom: 12 }}>
                  {col.title}
                </p>
                {col.items.map(item => (
                  <p key={item} style={{ fontSize: 14, color: '#86868B', lineHeight: 1.9, fontWeight: 400 }}>{item}</p>
                ))}
              </div>
            ))}
          </div>

          {/* TODO: connect to /about or /team route */}
          <button
            className="btn btn-ghost"
            onClick={() => console.log('TODO: connect to Meet the Team page')}
            aria-label="Meet the Bowling Planet team"
          >
            Meet the Team →
          </button>
        </div>
      </div>
      </div>
    </section>
  )
}

export default AboutSection
