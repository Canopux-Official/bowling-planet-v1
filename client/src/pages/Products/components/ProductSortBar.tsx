import { type FC } from 'react'
import { theme } from '../../../theme'
import type { SortOption } from '../../../types/product'

interface Props {
  total: number
  sort: SortOption
  onSortChange: (sort: SortOption) => void
  onOpenFilters: () => void
}

const ProductSortBar: FC<Props> = ({ total, sort, onSortChange, onOpenFilters }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16,
      flexWrap: 'wrap',
      marginBottom: 24,
      paddingBottom: 16,
      borderBottom: `1px solid ${theme.colors.border}`,
    }}
  >
    <p style={{ margin: 0, fontSize: 14, color: theme.colors.text2 }}>
      <span style={{ color: theme.colors.text1, fontWeight: 600 }}>{total}</span> solutions
    </p>

    <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
      <button
        type="button"
        className="btn btn-ghost filters-mobile-btn"
        style={{ padding: '10px 16px', display: 'none' }}
        onClick={onOpenFilters}
      >
        Filters
      </button>

      <label htmlFor="product-sort" style={{ fontSize: 13, color: theme.colors.text3, fontWeight: 600 }}>
        Sort
      </label>
      <select
        id="product-sort"
        value={sort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        style={{
          padding: '10px 14px',
          borderRadius: 4,
          border: `1px solid ${theme.colors.border}`,
          background: theme.colors.void,
          color: theme.colors.text1,
          fontSize: 13,
          fontFamily: theme.typography.fontBody,
          cursor: 'pointer',
        }}
      >
        <option value="featured">Featured</option>
        <option value="name-asc">Name A–Z</option>
        <option value="name-desc">Name Z–A</option>
        <option value="newest">Newest</option>
      </select>
    </div>

    <style>{`
      @media (max-width: 960px) {
        .filters-mobile-btn { display: inline-flex !important; }
      }
    `}</style>
  </div>
)

export default ProductSortBar
