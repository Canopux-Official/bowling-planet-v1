import { type FC } from 'react'
import { motion } from 'framer-motion'
import { theme } from '../../../theme'
import type { Product } from '../../../types/product'
import { fadeUp, staggerContainer, viewportOnce } from '../../../animations/motion'

interface Props {
  product: Product
}

const ProductBenefits: FC<Props> = ({ product }) => (
  <section
    aria-labelledby="benefits-title"
    style={{ background: theme.colors.void, padding: '96px 28px', borderBottom: `1px solid ${theme.colors.border}` }}
  >
    <div style={{ maxWidth: theme.layout.maxWidth, margin: '0 auto' }}>
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        <motion.div variants={fadeUp} className="label" style={{ marginBottom: 16 }}>
          Business Benefits
        </motion.div>
        <motion.h2
          id="benefits-title"
          variants={fadeUp}
          className="font-display"
          style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            maxWidth: 640,
            marginBottom: 16,
            color: theme.colors.text1,
          }}
        >
          Commercial outcomes, not feature lists
        </motion.h2>
        <motion.p
          variants={fadeUp}
          style={{
            color: theme.colors.text2,
            fontSize: 16,
            lineHeight: 1.7,
            maxWidth: 560,
            marginBottom: 56,
          }}
        >
          Decision makers evaluate attractions on footfall, dwell, yield and operating discipline.
          This programme is specified against those measures.
        </motion.p>

        <div
          className="benefits-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
            background: theme.colors.border,
            border: `1px solid ${theme.colors.border}`,
          }}
        >
          {product.benefits.map((benefit) => (
            <motion.article
              key={benefit.id}
              variants={fadeUp}
              style={{
                background: theme.colors.void,
                padding: '36px 32px',
              }}
            >
              {benefit.metric && (
                <div
                  style={{
                    fontSize: 12,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: theme.colors.teal,
                    fontWeight: 600,
                    marginBottom: 14,
                  }}
                >
                  {benefit.metric}
                </div>
              )}
              <h3
                className="font-display"
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  marginBottom: 12,
                  color: theme.colors.text1,
                }}
              >
                {benefit.title}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: theme.colors.text2, margin: 0 }}>
                {benefit.description}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </div>

    <style>{`
      @media (max-width: 900px) {
        .benefits-grid { grid-template-columns: 1fr 1fr !important; }
      }
      @media (max-width: 600px) {
        .benefits-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
  </section>
)

export default ProductBenefits
