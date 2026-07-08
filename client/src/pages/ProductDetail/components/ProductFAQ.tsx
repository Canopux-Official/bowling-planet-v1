import { type FC, useId, useState } from 'react'
import { motion } from 'framer-motion'
import { theme } from '../../../theme'
import type { Product } from '../../../types/product'
import { fadeUp, staggerContainer, viewportOnce } from '../../../animations/motion'

interface Props {
  product: Product
}

const ProductFAQ: FC<Props> = ({ product }) => {
  const [open, setOpen] = useState<number | null>(0)
  const baseId = useId()

  return (
    <section
      aria-labelledby="faq-title"
      style={{ background: theme.colors.void, padding: '96px 28px', borderBottom: `1px solid ${theme.colors.border}` }}
    >
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.div variants={fadeUp} className="label" style={{ justifyContent: 'center', marginBottom: 16 }}>
            Frequently Asked Questions
          </motion.div>
          <motion.h2
            id="faq-title"
            variants={fadeUp}
            className="font-display"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              marginBottom: 12,
              textAlign: 'center',
              color: theme.colors.text1,
            }}
          >
            Practical answers for operators
          </motion.h2>
          <motion.p
            variants={fadeUp}
            style={{
              textAlign: 'center',
              color: theme.colors.text2,
              fontSize: 15,
              marginBottom: 48,
              lineHeight: 1.7,
            }}
          >
            Scope, space, timeline and post-opening support — clarified for investment committees.
          </motion.p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: `1px solid ${theme.colors.border}` }}>
            {product.faqs.map((faq, i) => {
              const isOpen = open === i
              const panelId = `${baseId}-panel-${i}`
              const buttonId = `${baseId}-btn-${i}`
              return (
                <motion.div
                  key={faq.id}
                  variants={fadeUp}
                  style={{ borderBottom: `1px solid ${theme.colors.border}` }}
                >
                  <h3 style={{ margin: 0, fontSize: 'inherit', fontWeight: 'inherit' }}>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      style={{
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '22px 4px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 16,
                        textAlign: 'left',
                      }}
                    >
                      <span
                        className="font-display"
                        style={{
                          fontWeight: 700,
                          fontSize: 16,
                          color: isOpen ? theme.colors.teal : theme.colors.text1,
                          lineHeight: 1.4,
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {faq.question}
                      </span>
                      <span
                        aria-hidden="true"
                        style={{
                          color: isOpen ? theme.colors.teal : theme.colors.text3,
                          fontSize: 22,
                          fontWeight: 300,
                          flexShrink: 0,
                          transform: isOpen ? 'rotate(45deg)' : 'none',
                          transition: 'transform 0.25s ease',
                        }}
                      >
                        +
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    style={{ padding: isOpen ? '0 4px 22px' : 0 }}
                  >
                    {isOpen && (
                      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: theme.colors.text2 }}>
                        {faq.answer}
                      </p>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProductFAQ
