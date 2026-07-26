import type { FC } from 'react'
import type { IProductItem } from '../services/baseProductDetailsApi'
import EmptyState from '../../../components/common/EmptyState'
import Loader from '../../../components/common/Loader'
import ErrorState from '../../../components/common/ErrorState'
import ProductItemCard from './ProductItemCard'

interface ProductItemsGridProps {
  items: IProductItem[]
  loading?: boolean
  error?: string | null
  onRetry?: () => void
}

const ProductItemsGrid: FC<ProductItemsGridProps> = ({
  items,
  loading,
  error,
  onRetry,
}) => {
  if (loading) return <Loader label="Loading products…" />
  if (error) return <ErrorState message={error} onRetry={onRetry} />
  if (items.length === 0) {
    return <EmptyState message="No products in this category yet." />
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <ProductItemCard key={item._id} item={item} />
      ))}
    </div>
  )
}

export default ProductItemsGrid
