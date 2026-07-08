import { type FC } from 'react'
import { motion } from 'framer-motion'
import { theme } from '../../../theme'
import type { Product } from '../../../types/product'
import { fadeUp, staggerContainer, viewportOnce } from '../../../animations/motion'

interface Props {
  product: Product
}

const ProductApplications: FC<Props> = ({ product }) => (
  <section
    aria-labelledby="applications-title"
    style={{ background: theme.colors.void, padding: '96px 28px', borderBottom: `1px solid ${theme.colors.border}` }}
  >
    <div style={{ maxWidth: theme.layout.maxWidth, margin: '0 auto' }}>
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        <motion.div variants={fadeUp} className="label" style={{ marginBottom: 16 }}>
          Applications
        </motion.div>
        <motion.h2
          id="applications-title"
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
          Where this programme fits
        </motion.h2>

        <div
          className="apps-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 1,
            background: theme.colors.border,
            border: `1px solid ${theme.colors.border}`,
          }}
        >
          {product.applications.map((app, i) => (
            <motion.article
              key={app.id}
              variants={fadeUp}
              style={{ background: theme.colors.void, padding: '32px 28px' }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: theme.colors.text3,
                  letterSpacing: '0.12em',
                  fontWeight: 600,
                  marginBottom: 14,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3
                className="font-display"
                style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: theme.colors.text1 }}
              >
                {app.title}
              </h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: theme.colors.text2 }}>
                {app.description}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
)

export default ProductApplications
