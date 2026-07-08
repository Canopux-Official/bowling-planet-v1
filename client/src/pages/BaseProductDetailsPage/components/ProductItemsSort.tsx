import type { FC } from 'react'
import styles from './ProductItemsSort.module.css'

// Mirrors backend sort options; applied client-side on mock data.
export type ProductItemsSortOption =
  | 'newest'
  | 'bestsellers'
  | 'featured'
  | 'price-asc'
  | 'price-desc'

interface ProductItemsSortProps {
  value: ProductItemsSortOption
  onChange: (value: ProductItemsSortOption) => void
}

const OPTIONS: { value: ProductItemsSortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'bestsellers', label: 'Bestsellers' },
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

const ProductItemsSort: FC<ProductItemsSortProps> = ({ value, onChange }) => (
  <div className={styles.wrap}>
    <div className={styles.field}>
      <label className={styles.label} htmlFor="product-items-sort">
        Sort
      </label>
      <select
        id="product-items-sort"
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value as ProductItemsSortOption)}
      >
        {OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  </div>
)

export default ProductItemsSort
