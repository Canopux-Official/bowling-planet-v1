import type { FC } from 'react'
import { Search } from 'lucide-react'
import ExpandablePills from '../../../components/common/ExpandablePills'

export interface ProductsFilterState {
  search: string
}

interface ProductsFiltersProps {
  value: ProductsFilterState
  onChange: (next: ProductsFilterState) => void
  categories: { slug: string; title: string }[]
  activeSlug: string | null
  onSelectCategory: (slug: string | null) => void
}

const pillClass = (active: boolean) =>
  `shrink-0 cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
    active
      ? 'border-[#5FC1D1] bg-[#5FC1D1]/15 text-[#5FC1D1]'
      : 'border-white/15 bg-[#111118] text-[#A1A1A6] hover:border-[#5FC1D1]/40 hover:text-[#F5F5F7]'
  }`

const ProductsFilters: FC<ProductsFiltersProps> = ({
  value,
  onChange,
  categories,
  activeSlug,
  onSelectCategory,
}) => (
  <div className="mb-6 space-y-4">
    <div className="relative max-w-md">
      <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#48484A]" />
      <input
        id="products-search"
        type="search"
        value={value.search}
        placeholder="Search categories…"
        aria-label="Search product categories"
        onChange={(e) => onChange({ search: e.target.value })}
        className="w-full rounded-xl border border-white/[0.1] bg-[#111118] py-2.5 pl-10 pr-4 text-sm text-[#F5F5F7] outline-none transition-colors placeholder:text-[#48484A] focus:border-[#5FC1D1]/50"
      />
    </div>

    <ExpandablePills aria-label="Product categories">
      <button
        type="button"
        onClick={() => onSelectCategory(null)}
        className={pillClass(activeSlug === null)}
      >
        All categories
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug}
          type="button"
          onClick={() => onSelectCategory(cat.slug)}
          className={pillClass(activeSlug === cat.slug)}
        >
          {cat.title}
        </button>
      ))}
    </ExpandablePills>
  </div>
)

export default ProductsFilters
