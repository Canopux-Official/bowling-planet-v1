import { type FC, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { theme } from '../../../theme'
import type { Product } from '../../../types/product'
import { fadeUp, staggerContainer, viewportOnce } from '../../../animations/motion'
import { ROUTES } from '../../../constants/site'

interface Props {
  product: Product
}

const ProductRelated: FC<Props> = ({ product }) => {
  const trackRef = useRef<HTMLDivElement>(null)

  if (!product.relatedProducts.length) return null

  const scrollBy = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' })
  }

  return (
    <section
      aria-labelledby="related-title"
      style={{ background: theme.colors.surface, padding: '96px 28px', borderBottom: `1px solid ${theme.colors.border}` }}
    >
      <div style={{ maxWidth: theme.layout.maxWidth, margin: '0 auto' }}>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 24, marginBottom: 40, flexWrap: 'wrap' }}>
            <div>
              <motion.div variants={fadeUp} className="label" style={{ marginBottom: 16 }}>
                Related Solutions
              </motion.div>
              <motion.h2
                id="related-title"
                variants={fadeUp}
                className="font-display"
                style={{
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  margin: 0,
                  color: theme.colors.text1,
                }}
              >
                Continue the programme
              </motion.h2>
            </div>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: 8 }}>
              <button type="button" className="btn btn-ghost" style={{ padding: '10px 18px' }} onClick={() => scrollBy(-1)} aria-label="Scroll related products left">
                ←
              </button>
              <button type="button" className="btn btn-ghost" style={{ padding: '10px 18px' }} onClick={() => scrollBy(1)} aria-label="Scroll related products right">
                →
              </button>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            ref={trackRef}
            className="related-track"
            style={{
              display: 'flex',
              gap: 20,
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              paddingBottom: 8,
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {product.relatedProducts.map((item) => (
              <Link
                key={item.id}
                to={ROUTES.productDetail(item.slug)}
                style={{
                  flex: '0 0 min(320px, 82vw)',
                  scrollSnapAlign: 'start',
                  textDecoration: 'none',
                  border: `1px solid ${theme.colors.border}`,
                  background: theme.colors.void,
                  borderRadius: 4,
                  overflow: 'hidden',
                  color: 'inherit',
                  transition: 'border-color 0.25s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(95,193,209,0.45)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.colors.border }}
              >
                <div style={{ aspectRatio: '16 / 10', background: theme.colors.surface2 }}>
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div style={{ padding: '22px 20px 26px' }}>
                  <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: theme.colors.text3, fontWeight: 600, marginBottom: 8 }}>
                    {item.category}
                  </div>
                  <h3 className="font-display" style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: theme.colors.text1 }}>
                    {item.name}
                  </h3>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: theme.colors.text2 }}>
                    {item.summary}
                  </p>
                </div>
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .related-track::-webkit-scrollbar { height: 4px; }
        .related-track::-webkit-scrollbar-thumb { background: ${theme.colors.surface3}; }
      `}</style>
    </section>
  )
}

export default ProductRelated
