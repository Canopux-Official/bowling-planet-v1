import type { FC } from 'react'
import EmptyState from '../../../components/common/EmptyState'
import Loader from '../../../components/common/Loader'
import ErrorState from '../../../components/common/ErrorState'
import BaseProductCard from './BaseProductCard'
import type { IBaseProduct } from '../services/baseProductsApi'

interface BaseProductGridProps {
  products: IBaseProduct[]
  loading?: boolean
  error?: string | null
  onRetry?: () => void
}

const BaseProductGrid: FC<BaseProductGridProps> = ({
  products,
  loading,
  error,
  onRetry,
}) => {
  if (loading) return <Loader label="Loading categories…" />
  if (error) return <ErrorState message={error} onRetry={onRetry} />
  if (products.length === 0) {
    return <EmptyState message="No product categories match your search." />
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <BaseProductCard key={product._id || product.slug} product={product} />
      ))}
    </div>
  )
}

export default BaseProductGrid
