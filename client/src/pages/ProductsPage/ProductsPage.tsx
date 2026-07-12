import { type FC, useCallback, useEffect, useState } from 'react'
import ProductsFilters, { type ProductsFilterState } from './components/ProductsFilters'
import BaseProductGrid from './components/BaseProductGrid'
import Pagination from './components/Pagination'
import { theme } from '../../theme'
import { useReveal } from '../../hooks/useReveal'
import {
  getAllBaseProducts,
  type IBaseProduct,
  type IPaginationMeta,
} from './services/baseProductsApi'

const ProductsPage: FC = () => {
  const [filters, setFilters] = useState<ProductsFilterState>({ search: '' })
  const [page, setPage] = useState(1)
  const [products, setProducts] = useState<IBaseProduct[]>([])
  const [pagination, setPagination] = useState<IPaginationMeta>({ page: 1, limit: 10, total: 0, pages: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const headRef = useReveal()

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getAllBaseProducts({ page, limit: 10, search: filters.search || undefined })
      setProducts(data.products)
      setPagination(data.pagination)
    } catch {
      setError('Unable to load products.')
    } finally {
      setLoading(false)
    }
  }, [filters.search, page])

  useEffect(() => { void load() }, [load])

  return (
    <>
      {/* Hero */}
      <section style={{ background: theme.colors.void, padding: '140px 28px 80px', position: 'relative', overflow: 'hidden' }}>
        <div className="orb orb-teal" style={{ width: 700, height: 600, top: '-25%', left: '50%', transform: 'translateX(-50%)', opacity: 0.5 }} />
        <div className="orb orb-green" style={{ width: 300, height: 300, bottom: '-5%', left: '-5%' }} />
        <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div ref={headRef} className="reveal" style={{ textAlign: 'center' }}>
            <div className="label" style={{ justifyContent: 'center', marginBottom: 24 }}>Our Products</div>
            <h1 className="font-display" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)', fontWeight: 800, lineHeight: 1.06, letterSpacing: '-0.04em', marginBottom: 24 }}>
              <span className="text-metallic" style={{ display: 'block' }}>World-Class</span>
              <span className="text-gradient-brand" style={{ display: 'block' }}>Entertainment</span>
              <span className="text-metallic" style={{ display: 'block' }}>Products.</span>
            </h1>
            <p style={{ fontSize: 17, color: theme.colors.text2, maxWidth: 520, margin: '0 auto', lineHeight: 1.75, fontFamily: theme.typography.fontBody }}>
              Explore our entertainment categories — each containing the variants and configurations available for your FEC.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: theme.colors.surface, padding: '60px 28px 80px', position: 'relative' }}>
        <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <ProductsFilters
            value={filters}
            onChange={(next) => { setFilters(next); setPage(1) }}
          />
          <BaseProductGrid products={products} loading={loading} error={error} onRetry={() => void load()} />
          {!loading && !error ? <Pagination meta={pagination} onPageChange={setPage} /> : null}
        </div>
      </section>
    </>
  )
}

export default ProductsPage
