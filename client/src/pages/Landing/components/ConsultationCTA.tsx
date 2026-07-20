/**
 * ConsultationCTA — Terminal CTA section.
 * Dark, premium, highly focused call-to-action to book a consultation.
 */

import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../../../hooks/useReveal'
import { useLeadTracker } from '../../../context/LeadTrackerContext'
import { ArrowRight, Calendar } from 'lucide-react'

const ConsultationCTA: FC = () => {
  const ref = useReveal()
  const { logCTAEvent } = useLeadTracker()

  return (
    <section id="cta" style={{ background: '#050508', padding: '120px 28px', position: 'relative', overflow: 'hidden' }}>
      
      {/* Glow orbs */}
      <div className="orb orb-teal" style={{ width: 800, height: 800, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.15 }} />
      <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div
          ref={ref}
          className="reveal"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 32, padding: '80px 40px',
            textAlign: 'center',
            boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 64, height: 64, borderRadius: '50%',
            background: 'rgba(95,193,209,0.1)', color: '#5FC1D1',
            marginBottom: 32, border: '1px solid rgba(95,193,209,0.2)'
          }}>
            <Calendar size={28} />
          </div>

          <h2 className="font-display text-metallic" style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400,
            lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 24,
          }}>
            Ready to Build<br />Something Extraordinary?
          </h2>
          
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: 17, color: 'var(--text-2)',
            lineHeight: 1.7, maxWidth: 500, margin: '0 auto 48px'
          }}>
            Whether you have a site selected or are just exploring the numbers, 
            schedule a free 30-minute discovery call with our consulting team.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
            <Link
              to="/contact"
              onClick={() => logCTAEvent('Landing: CTA Primary (Book Call)')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '16px 32px', borderRadius: 100,
                background: 'linear-gradient(135deg, #5FC1D1, #48A8B8)',
                color: '#000', textDecoration: 'none',
                fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 700,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 24px rgba(95,193,209,0.3)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              Book Discovery Call
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/about"
              onClick={() => logCTAEvent('Landing: CTA Secondary (Our Process)')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '16px 32px', borderRadius: 100,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff', textDecoration: 'none',
                fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
              }}
            >
              Learn Our Process
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ConsultationCTA
