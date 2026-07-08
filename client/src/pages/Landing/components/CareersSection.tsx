import { type FC } from 'react'
import { useReveal } from '../../../hooks/useReveal'


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

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <button
              className="btn btn-primary"
              onClick={() => console.log('TODO: connect to full careers page')}
              aria-label="Visit Career Page"
              style={{ padding: '14px 32px', fontSize: 16 }}
            >
              Visit Career Page
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CareersSection


