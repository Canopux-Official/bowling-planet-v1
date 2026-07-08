/**
 * FranchiseFAQ — Accordion FAQ with conversion focus
 * Answers objections, not just questions
 */
import { type FC, useState } from 'react'
import { theme } from '../../../theme'
import { useReveal } from '../../../hooks/useReveal'

const FAQS = [
  {
    q: 'Why should I choose Bowling Planet for my FEC business?',
    a: 'You get a strong, proven partner with Bowling Planet! We bring 17+ years of industry expertise, a seasoned team, and 700+ game options. You also get tailor-made business models for different investment levels, support for complex high-end projects, and a data-driven approach focused on ROI. We help you from pre-opening planning to smooth operations.',
  },
  {
    q: 'What kinds of games and entertainment are offered?',
    a: 'Over 700+ games across diverse segments — Bowling, VR, Arcade, Redemption, Kiddie Rides, Laser Tag, Bumper Cars, Rock Climbing, Trampolines, Mini Golf, Go-Karts, and much more. No competitor in India offers this breadth under one consulting roof.',
  },
  {
    q: 'What is the minimum investment required?',
    a: 'Our Economy tier starts from just ₹35 Lakhs for a 1,500 sq ft neighbourhood game lounge, scaling all the way to ₹20 Crore for a 35,000 sq ft mega-complex. Every model is designed to be profitable at its own scale.',
  },
  {
    q: 'Do I need prior experience in the entertainment industry?',
    a: 'Not at all! Our comprehensive training and onboarding program covers everything — game operations, staff management, customer service, marketing, and business operations. We turn first-timers into successful FEC operators.',
  },
  {
    q: 'Is there flexibility and customisation in the franchise model?',
    a: 'Absolutely. Every business plan is tailor-made based on your location, target audience, investment level, and growth ambitions. There is no cookie-cutter approach here.',
  },
  {
    q: 'What are the franchise fees or deposits?',
    a: 'We charge ZERO traditional franchise fees. Instead, we offer a transparent pre-opening setup and consultation package. This covers site analysis, ROI forecasting, design, licensing support, staff training, and grand opening preparation. Fees vary by investment tier — but there are no surprise costs.',
  },
  {
    q: 'How are royalty fees structured?',
    a: 'We typically charge 5% on Gross Sales as a royalty fee. For Premium and Deluxe investment models, this covers an all-inclusive package of business operations services. For other tiers, services are customisable at an additional charge, giving you full flexibility.',
  },
  {
    q: 'What licenses and permits do I need to operate?',
    a: 'The key licenses include: Trade License from the municipal corporation, Company and Store registrations, PPL License (music), FSSAI License (if F&B), FIRE NOC, GST Registration, Principal Employer Certificate, and various other state/central government NOCs. We guide you through every single one — no confusion, no delays.',
  },
]

const FranchiseFAQ: FC = () => {
  const [open, setOpen] = useState<number | null>(0)
  const headRef = useReveal()

  return (
    <section
      style={{
        background: theme.colors.void,
        padding: '120px 28px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3, pointerEvents: 'none' }} />
      <div className="orb orb-teal" style={{ width: 400, height: 400, bottom: '-5%', right: '-5%' }} />

      <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="label" style={{ justifyContent: 'center', marginBottom: 20 }}>
            Frequently Asked Questions
          </div>
          <h2 className="font-display text-metallic" style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            marginBottom: 16,
          }}>
            Your Questions, Answered Honestly.
          </h2>
          <p style={{ color: theme.colors.text2, fontSize: 16, maxWidth: 480, margin: '0 auto' }}>
            No marketing fluff. Real answers from people who've helped launch 21+ FEC businesses.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {FAQS.map((faq, i) => {
            const isOpen = open === i
            return (
              <div
                key={i}
                className="glass-card"
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  borderColor: isOpen ? 'rgba(95,193,209,0.3)' : theme.colors.border,
                  transition: 'border-color 0.3s ease',
                }}
              >
                <button
                  className="faq-btn"
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '22px 28px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 16,
                    textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontFamily: theme.typography.fontDisplay,
                    fontWeight: 700,
                    fontSize: 15,
                    color: isOpen ? theme.colors.teal : theme.colors.text1,
                    lineHeight: 1.4,
                    letterSpacing: '-0.01em',
                    transition: 'color 0.2s ease',
                  }}>
                    {faq.q}
                  </span>
                  <span style={{
                    color: isOpen ? theme.colors.teal : theme.colors.text3,
                    fontSize: 20,
                    fontWeight: 300,
                    flexShrink: 0,
                    transition: 'all 0.3s ease',
                    transform: isOpen ? 'rotate(45deg)' : 'none',
                    lineHeight: 1,
                  }}>
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="faq-content" style={{
                    padding: '0 28px 24px',
                    borderTop: `1px solid ${theme.colors.border}`,
                    paddingTop: 20,
                  }}>
                    <p style={{
                      fontSize: 14,
                      color: theme.colors.text2,
                      lineHeight: 1.75,
                      fontFamily: theme.typography.fontBody,
                    }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .faq-btn { padding: 18px 20px !important; }
          .faq-content { padding: 0 20px 20px !important; padding-top: 16px !important; }
        }
      `}</style>
    </section>
  )
}

export default FranchiseFAQ

