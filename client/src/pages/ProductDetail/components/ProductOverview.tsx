import { type FC } from 'react'
import { motion } from 'framer-motion'
import { theme } from '../../../theme'
import type { Product } from '../../../types/product'
import { fadeUp, staggerContainer, viewportOnce } from '../../../animations/motion'

interface Props {
  product: Product
}

const ProductOverview: FC<Props> = ({ product }) => {
  const items = [
    { label: 'Suitable Industries', value: product.overview.industries.join(' · ') },
    { label: 'Required Space', value: product.overview.spaceRequired },
    { label: 'Capacity', value: product.overview.capacity },
    { label: 'Applications', value: product.overview.applications.join(' · ') },
    { label: 'Installation', value: product.overview.installation },
  ]

  return (
    <section
      aria-labelledby="overview-title"
      style={{
        background: theme.colors.surface,
        padding: '88px 28px',
        borderBottom: `1px solid ${theme.colors.border}`,
      }}
    >
      <div style={{ maxWidth: theme.layout.maxWidth, margin: '0 auto' }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={fadeUp} className="label" style={{ marginBottom: 16 }}>
            Quick Overview
          </motion.div>
          <motion.h2
            id="overview-title"
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
            Programme parameters at a glance
          </motion.h2>

          <dl
            className="overview-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 0,
              borderTop: `1px solid ${theme.colors.border}`,
            }}
          >
            {items.map((item) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                style={{
                  padding: '28px 24px 28px 0',
                  borderBottom: `1px solid ${theme.colors.border}`,
                  marginRight: 24,
                }}
              >
                <dt
                  style={{
                    fontSize: 12,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: theme.colors.text3,
                    fontWeight: 600,
                    marginBottom: 12,
                  }}
                >
                  {item.label}
                </dt>
                <dd
                  style={{
                    margin: 0,
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: theme.colors.text1,
                    fontFamily: theme.typography.fontBody,
                  }}
                >
                  {item.value}
                </dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .overview-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .overview-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

export default ProductOverview
