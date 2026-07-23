/**
 * CareersSection — Light chalk section inviting top talent.
 * Features a staggered grid of "why join us" pills.
 */

import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useReveal } from '../../../hooks/useReveal'
import { useLeadTracker } from '../../../context/LeadTrackerContext'
import { ArrowRight } from 'lucide-react'

const PERKS = [
  'Shape the FEC Industry',
  'Data-Driven Culture',
  'PAN-India Projects',
  'Accelerated Growth',
  'End-to-End Exposure',
]

const CareersSection: FC = () => {
  const ref = useReveal()
  const { logCTAEvent } = useLeadTracker()

  return (
    <section id="careers"  style={{ background: '#000', padding: 'clamp(48px, 8vw, 72px) clamp(16px, 4vw, 28px)', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        <div ref={ref} className="reveal" style={{ textAlign: 'center' }}>
          <div className="label" style={{ justifyContent: 'center', marginBottom: 20, color: '#5FC1D1', borderColor: 'rgba(95,193,209,0.3)', background: 'rgba(95,193,209,0.08)' }}>
            Careers
          </div>
          
          <h2 className="font-display landing-section-heading" style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            marginBottom: 24,
          }}>
            Build the Future of<br />Entertainment With Us.
          </h2>
          
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 17, color: 'rgba(245,245,247,0.8)', lineHeight: 1.7,
            maxWidth: 580, margin: '0 auto 48px'
          }}>
            We're an ambitious team redefining India's FEC landscape. 
            If you're driven by data, operational excellence, and creating 
            spaces where people find joy — there's a place for you here.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginBottom: 56 }}>
            {PERKS.map((perk, i) => (
              <motion.div
                key={perk}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{
                  padding: '10px 20px', borderRadius: 100,
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                  fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, color: '#F5F5F7'
                }}
              >
                {perk}
              </motion.div>
            ))}
          </div>

          <Link
            to="/careers"
            onClick={() => logCTAEvent('Landing: View Careers')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '16px 32px', borderRadius: 100,
              background: '#F5F5F7', color: '#000', textDecoration: 'none',
              fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = '#4ab0c0'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = '#F5F5F7'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
            }}
          >
            View Open Roles
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CareersSection
