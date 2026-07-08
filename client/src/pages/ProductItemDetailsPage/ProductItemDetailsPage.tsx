import { type FC, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../../components/common/Loader'
import ErrorState from '../../components/common/ErrorState'
import ItemParentLink from './components/ItemParentLink'
import ItemHeader from './components/ItemHeader'
import ItemGallery from './components/ItemGallery'
import ItemFeatureList from './components/ItemFeatureList'
import ItemPoints from './components/ItemPoints'
import ItemUsedIn from './components/ItemUsedIn'
import ItemPurchaseCTA from './components/ItemPurchaseCTA'
import {
  getProductItemBySlug,
  type IProductItem,
} from './services/productItemDetailsApi'
import styles from './ProductItemDetailsPage.module.css'

const ProductItemDetailsPage: FC = () => {
  const { itemSlug } = useParams<{ baseSlug: string; itemSlug: string }>()
  const resolvedSlug = itemSlug
  const [item, setItem] = useState<IProductItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!resolvedSlug) {
      setError('Product not found.')
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    try {
      const data = await getProductItemBySlug(resolvedSlug)
      setItem(data)
    } catch {
      setError('Unable to load this product.')
      setItem(null)
    } finally {
      setLoading(false)
    }
  }, [resolvedSlug])

  useEffect(() => {
    void load()
  }, [load])

  if (loading) {
    return (
      <main className={styles.page}>
        <Loader label="Loading product…" />
      </main>
    )
  }

  if (error || !item) {
    return (
      <main className={styles.page}>
        <ErrorState
          message={error ?? 'Product not found.'}
          onRetry={() => void load()}
        />
      </main>
    )
  }

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <ItemParentLink baseProduct={item.baseProduct} />
        <ItemHeader
          title={item.title}
          description={item.description}
          price={item.price}
        />
        <ItemGallery
          thumbnail={item.thumbnail}
          gallery={item.gallery}
          title={item.title}
        />
        <ItemFeatureList featureList={item.featureList} />
        <ItemPoints points={item.points} />
        <ItemUsedIn usedIn={item.usedIn} />
        <ItemPurchaseCTA hasPrice={item.price !== undefined} />
      </div>
    </main>
  )
}

export default ProductItemDetailsPage
