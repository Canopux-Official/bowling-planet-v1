import type { FC } from 'react'
import styles from './ProductsFilters.module.css'

export interface ProductsFilterState {
  search: string
}

interface ProductsFiltersProps {
  value: ProductsFilterState
  onChange: (next: ProductsFilterState) => void
}

const ProductsFilters: FC<ProductsFiltersProps> = ({ value, onChange }) => (
  <div className={styles.filters}>
    <div className={styles.field}>
      <label className={styles.label} htmlFor="products-search">
        Search
      </label>
      <input
        id="products-search"
        className={styles.input}
        type="search"
        value={value.search}
        placeholder="Search product categories…"
        onChange={(e) => onChange({ search: e.target.value })}
      />
    </div>
  </div>
)

export default ProductsFilters
