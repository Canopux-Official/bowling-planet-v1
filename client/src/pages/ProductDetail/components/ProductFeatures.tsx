import { type FC } from 'react'
import { motion } from 'framer-motion'
import { theme } from '../../../theme'
import type { Product } from '../../../types/product'
import { fadeUp, staggerContainer, viewportOnce } from '../../../animations/motion'

interface Props {
  product: Product
}

const ProductFeatures: FC<Props> = ({ product }) => (
  <section
    aria-labelledby="features-title"
    style={{ background: theme.colors.surface, padding: '96px 28px', borderBottom: `1px solid ${theme.colors.border}` }}
  >
    <div style={{ maxWidth: theme.layout.maxWidth, margin: '0 auto' }}>
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        <motion.div variants={fadeUp} className="label" style={{ marginBottom: 16 }}>
          Key Features
        </motion.div>
        <motion.h2
          id="features-title"
          variants={fadeUp}
          className="font-display"
          style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            marginBottom: 64,
            color: theme.colors.text1,
            maxWidth: 560,
          }}
        >
          Designed for commercial floors
        </motion.h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 96 }}>
          {product.features.map((feature, index) => {
            const reverse = index % 2 === 1
            return (
              <motion.article
                key={feature.id}
                variants={fadeUp}
                className="feature-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 56,
                  alignItems: 'center',
                }}
              >
                <div style={{ order: reverse ? 2 : 1 }}>
                  <div
                    style={{
                      border: `1px solid ${theme.colors.border}`,
                      borderRadius: 4,
                      overflow: 'hidden',
                      background: theme.colors.void,
                      aspectRatio: '16 / 11',
                    }}
                  >
                    <img
                      src={feature.image}
                      alt={feature.imageAlt}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                </div>
                <div style={{ order: reverse ? 1 : 2 }}>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
                      fontWeight: 700,
                      letterSpacing: '-0.025em',
                      marginBottom: 16,
                      color: theme.colors.text1,
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: 16, lineHeight: 1.75, color: theme.colors.text2, margin: 0, maxWidth: 460 }}>
                    {feature.description}
                  </p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </motion.div>
    </div>

    <style>{`
      @media (max-width: 860px) {
        .feature-row {
          grid-template-columns: 1fr !important;
          gap: 24px !important;
        }
        .feature-row > div { order: unset !important; }
      }
    `}</style>
  </section>
)

export default ProductFeatures
