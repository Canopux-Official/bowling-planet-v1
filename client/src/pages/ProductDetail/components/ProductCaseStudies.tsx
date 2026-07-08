import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { theme } from '../../../theme'
import type { Product } from '../../../types/product'
import { fadeUp, staggerContainer, viewportOnce } from '../../../animations/motion'

interface Props {
  product: Product
}

const ProductCaseStudies: FC<Props> = ({ product }) => {
  if (!product.caseStudies.length) return null

  return (
    <section
      aria-labelledby="cases-title"
      style={{ background: theme.colors.void, padding: '96px 28px', borderBottom: `1px solid ${theme.colors.border}` }}
    >
      <div style={{ maxWidth: theme.layout.maxWidth, margin: '0 auto' }}>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.div variants={fadeUp} className="label" style={{ marginBottom: 16 }}>
            Related Case Studies
          </motion.div>
          <motion.h2
            id="cases-title"
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
            Projects that set the standard
          </motion.h2>

          <div
            className="cases-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
          >
            {product.caseStudies.map((cs) => (
              <motion.article
                key={cs.id}
                variants={fadeUp}
                style={{
                  border: `1px solid ${theme.colors.border}`,
                  background: theme.colors.surface,
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  borderRadius: 4,
                }}
              >
                <div style={{ aspectRatio: '16 / 10', overflow: 'hidden', background: theme.colors.void }}>
                  <img
                    src={cs.image}
                    alt={cs.imageAlt}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div style={{ padding: '28px 24px 32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: 12, color: theme.colors.teal, letterSpacing: '0.08em', fontWeight: 600, marginBottom: 10 }}>
                    {cs.location}
                  </div>
                  <h3
                    className="font-display"
                    style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: theme.colors.text1, letterSpacing: '-0.02em' }}
                  >
                    {cs.title}
                  </h3>
                  <p style={{ flex: 1, margin: '0 0 24px', fontSize: 14, lineHeight: 1.7, color: theme.colors.text2 }}>
                    {cs.overview}
                  </p>
                  <Link
                    to="/contact?intent=case-study"
                    className="btn-link"
                    style={{ alignSelf: 'flex-start' }}
                  >
                    View Case Study →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .cases-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .cases-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

export default ProductCaseStudies
