import { type FC } from 'react'
import { motion } from 'framer-motion'
import type { ProductListItem } from '../../../types/product'
import { staggerContainer } from '../../../animations/motion'
import ProductCard from './ProductCard'
import { theme } from '../../../theme'

interface Props {
  items: ProductListItem[]
  loading?: boolean
}

const ProductGrid: FC<Props> = ({ items, loading }) => {
  if (loading) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="product-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{
              border: `1px solid ${theme.colors.border}`,
              borderRadius: 4,
              overflow: 'hidden',
              background: theme.colors.void,
            }}
          >
            <div style={{ aspectRatio: '16 / 10', background: theme.colors.surface2 }} />
            <div style={{ padding: '24px 22px' }}>
              <div style={{ height: 18, width: '70%', background: theme.colors.surface2, marginBottom: 12, borderRadius: 2 }} />
              <div style={{ height: 12, width: '100%', background: theme.colors.surface2, marginBottom: 8, borderRadius: 2 }} />
              <div style={{ height: 12, width: '55%', background: theme.colors.surface2, borderRadius: 2 }} />
            </div>
          </div>
        ))}
        <style>{`
          @media (max-width: 1100px) {
            .product-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 640px) {
            .product-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
        <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
          Loading solutions…
        </span>
      </div>
    )
  }

  if (!items.length) {
    return (
      <div
        style={{
          border: `1px solid ${theme.colors.border}`,
          padding: '64px 28px',
          textAlign: 'center',
          color: theme.colors.text2,
          borderRadius: 4,
        }}
      >
        <p style={{ margin: 0, fontSize: 16 }}>No solutions match these filters.</p>
        <p style={{ margin: '10px 0 0', fontSize: 14 }}>Clear filters or try a different category.</p>
      </div>
    )
  }

  return (
    <motion.div
      key={items.map((i) => i.id).join('-')}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="product-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 20,
      }}
    >
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      <style>{`
        @media (max-width: 1100px) {
          .product-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .product-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </motion.div>
  )
}

export default ProductGrid
