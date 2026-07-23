/**
 * FranchiseFAQ — Accordion FAQ with conversion focus
 * Answers objections, not just questions
 */
import { type FC, useState } from 'react'
import { theme } from '../../../theme'
import { useReveal } from '../../../hooks/useReveal'
import type { IFranchiseFAQ } from '../../../services/franchisePageApi'

/** Used only when CMS/API returns no FAQs — never replaces loaded CMS content */
const FALLBACK_FAQS: IFranchiseFAQ[] = [
  {
    q: 'Why should I choose Bowling Planet for my FEC business?',
    a: 'You get a strong, proven partner with Bowling Planet. We bring 17+ years of industry expertise, turnkey delivery, and ₹0 franchise fees — so you keep more equity while we help you open and operate.',
  },
  {
    q: 'What kinds of games and entertainment are offered?',
    a: 'Over 700+ games across bowling, VR, arcade, redemption, toddler zones, and more — sourced, installed, and supported end to end.',
  },
  {
    q: 'What is the minimum investment required?',
    a: 'Our Economy tier starts from about ₹35 Lakhs for a neighbourhood game lounge. Higher tiers scale up to mega-complex programmes based on size and attractions.',
  },
  {
    q: 'Do I need prior FEC experience?',
    a: 'No. We guide registrations, site evaluation, training, and pre-opening prep so first-time operators can launch with confidence.',
  },
  {
    q: 'Is there a franchise fee?',
    a: 'No. Franchise fee is ₹0. Our model is built around consulting and delivery value, not entry barriers.',
  },
]

interface FranchiseFAQProps {
  faqs: IFranchiseFAQ[]
}

const FranchiseFAQ: FC<FranchiseFAQProps> = ({ faqs }) => {
  const [open, setOpen] = useState<number | null>(0)
  const headRef = useReveal()
  const list = faqs.length > 0 ? faqs : FALLBACK_FAQS

  return (
    <section
      style={{
        background: theme.colors.void,
        padding: '40px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3, pointerEvents: 'none' }} />
      <div className="orb orb-teal" style={{ width: 400, height: 400, bottom: '-5%', right: '-5%' }} />

      <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 24 }}>
          <div className="label" style={{ justifyContent: 'center', marginBottom: 8 }}>
            Frequently Asked Questions
          </div>
          <h2 className="font-display text-metallic" style={{
            fontSize: 'clamp(1.35rem, 2.8vw, 1.85rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            marginBottom: 8,
          }}>
            Your questions, answered
          </h2>
          <p style={{ color: theme.colors.text2, fontSize: 14, maxWidth: 480, margin: '0 auto' }}>
            Real answers for franchise partners evaluating an FEC opportunity.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {list.map((faq, i) => {
            const isOpen = open === i
            return (
              <div
                key={`${faq.q}-${i}`}
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
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
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
