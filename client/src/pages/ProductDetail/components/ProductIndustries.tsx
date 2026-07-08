import { type FC } from 'react'
import { motion } from 'framer-motion'
import { theme } from '../../../theme'
import type { Product } from '../../../types/product'
import { fadeUp, staggerContainer, viewportOnce } from '../../../animations/motion'

interface Props {
  product: Product
}

const ProductIndustries: FC<Props> = ({ product }) => (
  <section
    aria-labelledby="industries-title"
    style={{
      background: theme.colors.surface,
      padding: '96px 28px',
      borderBottom: `1px solid ${theme.colors.border}`,
    }}
  >
    <div style={{ maxWidth: theme.layout.maxWidth, margin: '0 auto' }}>
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        <motion.div variants={fadeUp} className="label" style={{ marginBottom: 16 }}>
          Industries
        </motion.div>
        <motion.h2
          id="industries-title"
          variants={fadeUp}
          className="font-display"
          style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            marginBottom: 48,
            color: theme.colors.text1,
          }}
        >
          Built for decision-makers across sectors
        </motion.h2>

        <div
          className="industries-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 1,
            background: theme.colors.border,
            border: `1px solid ${theme.colors.border}`,
          }}
        >
          {product.industrySections.map((item, i) => (
            <motion.article
              key={item.id}
              variants={fadeUp}
              style={{ background: theme.colors.surface, padding: '36px 32px' }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: theme.colors.teal,
                  letterSpacing: '0.12em',
                  fontWeight: 600,
                  marginBottom: 14,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3
                className="font-display"
                style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: theme.colors.text1 }}
              >
                {item.title}
              </h3>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: theme.colors.text2 }}>
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </div>

    <style>{`
      @media (max-width: 700px) {
        .industries-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
  </section>
)

export default ProductIndustries
