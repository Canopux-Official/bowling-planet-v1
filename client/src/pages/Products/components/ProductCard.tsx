import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { theme } from '../../../theme'
import { ROUTES } from '../../../constants/site'
import type { ProductListItem } from '../../../types/product'
import { fadeUp } from '../../../animations/motion'

interface Props {
  product: ProductListItem
}

const ProductCard: FC<Props> = ({ product }) => (
  <motion.article variants={fadeUp} style={{ height: '100%' }}>
    <Link
      to={ROUTES.productDetail(product.slug)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        textDecoration: 'none',
        color: 'inherit',
        border: `1px solid ${theme.colors.border}`,
        background: theme.colors.void,
        borderRadius: 4,
        overflow: 'hidden',
        transition: 'border-color 0.25s ease, transform 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(95,193,209,0.4)'
        e.currentTarget.style.transform = 'translateY(-3px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = theme.colors.border
        e.currentTarget.style.transform = 'none'
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '16 / 10', background: theme.colors.surface2, overflow: 'hidden' }}>
        <img
          src={product.image}
          alt={product.imageAlt}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.55) 100%)',
          }}
        />
        <span
          style={{
            position: 'absolute',
            left: 14,
            bottom: 14,
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: theme.colors.text1,
            background: 'rgba(0,0,0,0.55)',
            border: `1px solid ${theme.colors.border}`,
            padding: '6px 10px',
          }}
        >
          {product.category}
        </span>
      </div>

      <div style={{ padding: '24px 22px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3
          className="font-display"
          style={{
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            marginBottom: 10,
            color: theme.colors.text1,
            lineHeight: 1.3,
          }}
        >
          {product.name}
        </h3>
        <p style={{ margin: '0 0 16px', fontSize: 14, lineHeight: 1.65, color: theme.colors.text2, flex: 1 }}>
          {product.tagline}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
          {product.industries.slice(0, 2).map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 11,
                color: theme.colors.text3,
                border: `1px solid ${theme.colors.border}`,
                padding: '4px 8px',
                borderRadius: 2,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <span className="btn-link" style={{ alignSelf: 'flex-start' }}>
          View programme →
        </span>
      </div>
    </Link>
  </motion.article>
)

export default ProductCard
