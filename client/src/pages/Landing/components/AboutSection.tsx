import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../../../hooks/useReveal'
import { useLeadTracker } from '../../../context/LeadTrackerContext'

const AboutSection: FC = () => {
  const titleRef = useReveal()
  const leftRef  = useReveal()
  const rightRef = useReveal()
  const { logCTAEvent } = useLeadTracker()

  return (
    <section
      id="about"
      style={{ background: '#000000', padding: '80px 28px 0px', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background glow orbs */}
      <div className="orb orb-teal"  style={{ width: 600, height: 600, top: '-15%', right: '-10%', opacity: 0.5 }} />
      <div className="orb orb-green" style={{ width: 500, height: 500, bottom: '-10%', left: '-10%', opacity: 0.4 }} />

      {/* Subtle grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── Section Heading ───────────────────────────── */}
        <div ref={titleRef} className="reveal" style={{ textAlign: 'center', marginBottom: 80 }}>
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

        {/* ── Two-col content ───────────────────────────── */}
        <div
          className="about-two-col"
          style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 72, alignItems: 'start',
        }}>

          {/* ── Left: Visual card ─────────────────────────── */}
          <div ref={leftRef} className="reveal-left">
            <div style={{ position: 'relative', maxWidth: 460, margin: '0 auto' }}>

              {/* Main card */}
              <div style={{
                width: '100%',
                aspectRatio: '4/5',
                borderRadius: 24,
                overflow: 'hidden',
                position: 'relative',
                background: 'linear-gradient(160deg, rgba(95,193,209,0.08) 0%, rgba(0,0,0,0) 60%, rgba(109,189,78,0.06) 100%)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}>
                {/* Top gradient bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                  background: 'linear-gradient(90deg, #5FC1D1, #6DBD4E)',
                  boxShadow: '0 0 20px rgba(95,193,209,0.4)',
                }} />

                {/* Interior dot-grid pattern */}
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }} />

                {/* Floating orb inside card */}
                <div style={{
                  position: 'absolute', top: '30%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 180, height: 180, borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(95,193,209,0.12) 0%, transparent 70%)',
                  filter: 'blur(12px)',
                }} />

                {/* Center content — founder initials monogram */}
                <div style={{
                  position: 'absolute', top: '38%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                }}>
                  <div style={{
                    width: 100, height: 100, borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(95,193,209,0.15), rgba(109,189,78,0.1))',
                    border: '1px solid rgba(95,193,209,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 16px',
                    boxShadow: '0 0 30px rgba(95,193,209,0.15), inset 0 0 20px rgba(95,193,209,0.05)',
                  }}>
                    <span style={{
                      fontFamily: '"Sora", sans-serif', fontWeight: 800,
                      fontSize: 32, letterSpacing: '-0.03em', color: '#5FC1D1',
                    }}>RP</span>
                  </div>
                </div>

                {/* Name plate */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '40px 28px 28px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.97) 60%, transparent)',
                }}>
                  <p style={{
                    fontFamily: '"Sora", sans-serif', fontWeight: 700, fontSize: 22,
                    color: '#F5F5F7', letterSpacing: '-0.02em', marginBottom: 6,
                  }}>
                    Ranjith Pillai
                  </p>
                  <p style={{
                    fontFamily: '"Sora", sans-serif', fontSize: 12, fontWeight: 500,
                    letterSpacing: '0.14em', textTransform: 'uppercase', color: '#5FC1D1',
                    marginBottom: 16,
                  }}>
                    Founder & Managing Director
                  </p>
                  {/* Thin divider */}
                  <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(95,193,209,0.4), transparent)', marginBottom: 16 }} />
                  <p style={{ fontSize: 13, color: '#86868B', lineHeight: 1.6 }}>
                    17+ years shaping India's FEC &amp; cinema landscape
                  </p>
                </div>
              </div>

              {/* Floating badge — Est. */}
              <div style={{
                position: 'absolute', top: -16, right: -16,
                background: 'linear-gradient(135deg, #5FC1D1 0%, #4AAFBF 100%)',
                color: '#000', padding: '10px 20px', borderRadius: 10,
                fontFamily: '"Sora", sans-serif', fontWeight: 800, fontSize: 13,
                letterSpacing: '0.05em', textTransform: 'uppercase',
                boxShadow: '0 8px 32px rgba(95,193,209,0.4)',
                animation: 'float 4s ease-in-out infinite',
              }}>
                Est. 2020
              </div>


            </div>
          </div>

          {/* ── Right: Copy ───────────────────────────────── */}
          <div ref={rightRef} className="reveal-right" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

            {/* Pull quote */}
            <div style={{
              position: 'relative',
              padding: '28px 28px 28px 32px',
              borderRadius: 16,
              background: 'rgba(95,193,209,0.04)',
              border: '1px solid rgba(95,193,209,0.12)',
              marginBottom: 36,
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, bottom: 0, width: 3,
                borderRadius: '3px 0 0 3px',
                background: 'linear-gradient(to bottom, #5FC1D1, #6DBD4E)',
              }} />
              <p style={{
                fontFamily: '"Sora", sans-serif', fontStyle: 'italic',
                fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', fontWeight: 600,
                color: '#F5F5F7', lineHeight: 1.65, margin: 0,
              }}>
                "Great entertainment centers don't happen by accident. They are engineered —
                with data, design, and seventeen years of hard-won insight."
              </p>
            </div>

            <p style={{ fontSize: 16, lineHeight: 1.8, color: '#86868B', marginBottom: 36 }}>
              Bowling Planet was founded in 2020 by{' '}
              <strong style={{ color: '#F5F5F7', fontWeight: 600 }}>Ranjith Pillai</strong>, a veteran
              of India's family entertainment and cinema industries. His career spans some of the
              country's most recognizable FEC and cinema brands — making him one of the most
              experienced operators in the subcontinent.
            </p>

            {/* Brand columns */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginBottom: 40 }}>
              {[
                { title: 'FEC Track Record', color: '#5FC1D1', items: ['Woop', 'Shott', 'Idea Crate', 'Playaza', 'KidZania', 'Essel World'] },
                { title: 'Cinema Industry',  color: '#6DBD4E', items: ['Cinemax', 'Inox', 'Roongta Group'] },
              ].map(col => (
                <div key={col.title} style={{
                  padding: '20px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: col.color, marginBottom: 14 }}>
                    {col.title}
                  </p>
                  {col.items.map(item => (
                    <p key={item} style={{ fontSize: 14, color: '#86868B', lineHeight: 2, fontWeight: 400 }}>{item}</p>
                  ))}
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="btn btn-ghost"
              onClick={() => logCTAEvent('Landing: Meet the Team')}
              aria-label="Meet the Bowling Planet team"
            >
              Meet the Team →
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}

export default AboutSection


