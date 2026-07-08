import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { theme } from '../../../theme'
import { CTA } from '../../../constants/site'
import type { Product } from '../../../types/product'
import { fadeUp, staggerContainer } from '../../../animations/motion'
import { ProductBreadcrumbs } from '../../../components/product/ProductSeo'

interface Props {
  product: Product
}

const ProductHero: FC<Props> = ({ product }) => {
  return (
    <section
      aria-labelledby="product-hero-title"
      style={{
        background: theme.colors.void,
        padding: '120px 28px 72px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: `1px solid ${theme.colors.border}`,
      }}
    >
      <div style={{ maxWidth: theme.layout.maxWidth, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <ProductBreadcrumbs productName={product.name} />

        <div
          className="product-hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.05fr 0.95fr',
            gap: 64,
            alignItems: 'center',
          }}
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp} className="label" style={{ marginBottom: 20 }}>
              {product.category}
            </motion.div>

            <motion.h1
              id="product-hero-title"
              variants={fadeUp}
              className="font-display"
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 4.25rem)',
                fontWeight: 800,
                letterSpacing: '-0.035em',
                lineHeight: 1.08,
                marginBottom: 20,
                color: theme.colors.text1,
              }}
            >
              {product.headline}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              style={{
                fontSize: 17,
                lineHeight: 1.75,
                color: theme.colors.text2,
                maxWidth: 540,
                marginBottom: 36,
                fontFamily: theme.typography.fontBody,
              }}
            >
              {product.subheadline}
            </motion.p>

            <motion.div
              variants={fadeUp}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}
            >
              <Link to={CTA.bookConsultation.href} className="btn btn-primary">
                {CTA.bookConsultation.label}
              </Link>
              <a
                href={product.brochureUrl || '#brochure'}
                className="btn btn-ghost"
                download={Boolean(product.brochureUrl)}
              >
                {CTA.downloadBrochure.label}
              </a>
              <Link to={CTA.requestQuote.href} className="btn btn-ghost">
                {CTA.requestQuote.label}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            style={{
              borderRadius: 4,
              overflow: 'hidden',
              border: `1px solid ${theme.colors.border}`,
              background: theme.colors.surface,
              aspectRatio: '4 / 5',
              maxHeight: 620,
            }}
          >
            <img
              src={product.heroImage}
              alt={product.heroImageAlt}
              width={900}
              height={1125}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .product-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .product-hero-grid > div:last-child {
            max-height: 420px !important;
            aspect-ratio: 16 / 10 !important;
          }
        }
      `}</style>
    </section>
  )
}

export default ProductHero
