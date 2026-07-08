import { type FC, useCallback, useEffect, useState } from 'react'
import ProductsFilters, { type ProductsFilterState } from './components/ProductsFilters'
import BaseProductGrid from './components/BaseProductGrid'
import Pagination from './components/Pagination'
import {
  getAllBaseProducts,
  type IBaseProduct,
  type IPaginationMeta,
} from './services/baseProductsApi'
import styles from './ProductsPage.module.css'

const ProductsPage: FC = () => {
  const [filters, setFilters] = useState<ProductsFilterState>({ search: '' })
  const [page, setPage] = useState(1)
  const [products, setProducts] = useState<IBaseProduct[]>([])
  const [pagination, setPagination] = useState<IPaginationMeta>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getAllBaseProducts({
        page,
        limit: 10,
        search: filters.search || undefined,
      })
      setProducts(data.products)
      setPagination(data.pagination)
    } catch {
      setError('Unable to load products.')
    } finally {
      setLoading(false)
    }
  }, [filters.search, page])

  useEffect(() => {
    void load()
  }, [load])

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Products</span>
          <h1 className={styles.title}>Product categories</h1>
          <p className={styles.subtitle}>
            Explore entertainment categories — then open each programme to review available variants
            and configurations.
          </p>
        </header>

        <ProductsFilters
          value={filters}
          onChange={(next) => {
            setFilters(next)
            setPage(1)
          }}
        />

        <BaseProductGrid
          products={products}
          loading={loading}
          error={error}
          onRetry={() => void load()}
        />

        {!loading && !error ? (
          <Pagination meta={pagination} onPageChange={setPage} />
        ) : null}
      </div>
    </main>
  )
}

export default ProductsPage
