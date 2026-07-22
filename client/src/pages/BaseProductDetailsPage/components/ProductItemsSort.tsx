import type { FC } from 'react'

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
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'bestsellers', label: 'Bestsellers' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
]

const ProductItemsSort: FC<ProductItemsSortProps> = ({ value, onChange }) => (
  <div className="flex items-center gap-2">
    <label htmlFor="product-items-sort" className="text-xs font-semibold uppercase tracking-wide text-[#636366]">
      Sort
    </label>
    <select
      id="product-items-sort"
      value={value}
      onChange={(e) => onChange(e.target.value as ProductItemsSortOption)}
      className="cursor-pointer rounded-lg border border-white/[0.12] bg-[#111118] px-3 py-2 text-sm font-medium text-[#F5F5F7] outline-none transition-colors hover:border-[#5FC1D1]/40 focus:border-[#5FC1D1]/50"
    >
      {OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
)

export default ProductItemsSort
