import { type FC, useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loader from '../../components/common/Loader'
import ErrorState from '../../components/common/ErrorState'
import BaseProductHeader from './components/BaseProductHeader'
import ProductItemsGrid from './components/ProductItemsGrid'
import ProductItemsSort, {
  type ProductItemsSortOption,
} from './components/ProductItemsSort'
import {
  getBaseProductWithItems,
  type BaseProductWithItems,
  type IProductItem,
} from './services/baseProductDetailsApi'
import styles from './BaseProductDetailsPage.module.css'

function sortItems(
  items: IProductItem[],
  sort: ProductItemsSortOption,
): IProductItem[] {
  const next = [...items]
  switch (sort) {
    case 'newest':
      return next.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
    case 'bestsellers':
      return next.sort((a, b) => b.purchaseCount - a.purchaseCount)
    case 'featured':
      return next.sort((a, b) => {
        if (b.featuredOrder !== a.featuredOrder) {
          return b.featuredOrder - a.featuredOrder
        }
        return b.purchaseCount - a.purchaseCount
      })
    case 'price-asc':
      return next.sort((a, b) => (a.price ?? Number.POSITIVE_INFINITY) - (b.price ?? Number.POSITIVE_INFINITY))
    case 'price-desc':
      return next.sort((a, b) => (b.price ?? Number.NEGATIVE_INFINITY) - (a.price ?? Number.NEGATIVE_INFINITY))
    default:
      return next
  }
}

const BaseProductDetailsPage: FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [data, setData] = useState<BaseProductWithItems | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sort, setSort] = useState<ProductItemsSortOption>('featured')

  const load = useCallback(async () => {
    if (!slug) {
      setError('Product category not found.')
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    try {
      const result = await getBaseProductWithItems(slug)
      setData(result)
    } catch {
      setError('Unable to load this product category.')
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => {
    void load()
  }, [load])

  const sortedItems = useMemo(
    () => (data ? sortItems(data.items.filter(item => item.status === 'active'), sort) : []),
    [data, sort],
  )

  if (loading) {
    return (
      <main className={styles.page}>
        <Loader label="Loading category…" />
      </main>
    )
  }

  if (error || !data) {
    return (
      <main className={styles.page}>
        <ErrorState
          message={error ?? 'Product category not found.'}
          onRetry={() => void load()}
        />
      </main>
    )
  }

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <Link to="/products" className={styles.back}>
          ← All products
        </Link>

        <BaseProductHeader product={data} />

        <h2 className={styles.sectionTitle}>Available variants</h2>
        <p className={styles.sectionHint}>
          Browse configurations within this category.
        </p>

        <ProductItemsSort value={sort} onChange={setSort} />
        <ProductItemsGrid items={sortedItems} />
      </div>
    </main>
  )
}

export default BaseProductDetailsPage
