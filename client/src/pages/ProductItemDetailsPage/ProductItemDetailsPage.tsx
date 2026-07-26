import { type FC, useCallback, useEffect, useState } from 'react'
import SEO from '../../components/SEO'
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
      <div className="product-item-details-page flex min-h-[60vh] items-center justify-center bg-black px-5 pt-28">
        <Loader label="Loading product…" />
      </div>
    )
  }

  if (error || !item) {
    return (
      <div className="product-item-details-page flex min-h-[60vh] items-center justify-center bg-black px-5 pt-28">
        <ErrorState
          message={error ?? 'Product not found.'}
          onRetry={() => void load()}
        />
      </div>
    )
  }

  return (
    <div className="product-item-details-page min-h-[60vh] bg-black text-[#F5F5F7]">
      <SEO
        title={item.title}
        description={item.description || `Details about ${item.title}`}
        ogImage={item.thumbnail?.url}
        schemaMarkup={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: item.title,
          description: item.description,
          image: item.thumbnail?.url,
          ...(item.price && {
            offers: {
              '@type': 'Offer',
              price: item.price,
              priceCurrency: 'INR',
            },
          }),
        }}
      />

      <div className="mx-auto max-w-[1280px] px-5 pb-16 pt-24 sm:px-7 sm:pt-28">
        <div className="mb-5">
          <ItemParentLink baseProduct={item.baseProduct} />
        </div>

        {/* Two-column catalogue detail — core product visible first viewport */}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
          {/* Left: gallery + sticky CTA */}
          <div className="space-y-4 lg:sticky lg:top-24">
            <ItemGallery
              thumbnail={item.thumbnail}
              gallery={item.gallery}
              title={item.title}
            />
            <ItemPurchaseCTA
              hasPrice={item.price !== undefined}
              itemTitle={item.title}
              itemId={item._id || item.slug}
            />
          </div>

          {/* Right: details sections */}
          <div className="space-y-8">
            <ItemHeader
              title={item.title}
              description={item.description}
              price={item.price}
            />
            <ItemFeatureList featureList={item.featureList} />
            <ItemPoints points={item.points} />
            <ItemUsedIn usedIn={item.usedIn} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductItemDetailsPage
