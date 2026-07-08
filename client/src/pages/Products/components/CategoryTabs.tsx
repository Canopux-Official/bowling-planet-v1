import { type FC, useRef } from 'react'
import { theme } from '../../../theme'
import { PRODUCT_CATEGORIES, type ProductCategory } from '../../../types/product'

interface Props {
  active: ProductCategory | 'All'
  onChange: (category: ProductCategory | 'All') => void
}

const CategoryTabs: FC<Props> = ({ active, onChange }) => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      style={{
        background: theme.colors.surface,
        borderBottom: `1px solid ${theme.colors.border}`,
        position: 'sticky',
        top: 64,
        zIndex: 40,
      }}
    >
      <div style={{ maxWidth: theme.layout.maxWidth, margin: '0 auto', padding: '0 28px' }}>
        <div
          ref={ref}
          role="tablist"
          aria-label="Solution categories"
          className="category-tabs"
          style={{
            display: 'flex',
            gap: 4,
            overflowX: 'auto',
            padding: '14px 0',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {PRODUCT_CATEGORIES.map((cat) => {
            const isActive = active === cat
            return (
              <button
                key={cat}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => onChange(cat)}
                style={{
                  flex: '0 0 auto',
                  padding: '10px 16px',
                  borderRadius: 980,
                  border: `1px solid ${isActive ? 'rgba(95,193,209,0.45)' : theme.colors.border}`,
                  background: isActive ? 'rgba(95,193,209,0.1)' : 'transparent',
                  color: isActive ? theme.colors.teal : theme.colors.text2,
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: theme.typography.fontBody,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>
      <style>{`
        .category-tabs::-webkit-scrollbar { height: 0; }
      `}</style>
    </div>
  )
}

export default CategoryTabs
