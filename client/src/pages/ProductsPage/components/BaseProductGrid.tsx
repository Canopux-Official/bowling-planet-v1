import type { FC } from 'react'
import type { IBaseProduct } from '../services/baseProductsApi'
import EmptyState from '../../../components/common/EmptyState'
import Loader from '../../../components/common/Loader'
import ErrorState from '../../../components/common/ErrorState'
import BaseProductCard from './BaseProductCard'
import styles from './BaseProductGrid.module.css'

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
  if (loading) return <Loader label="Loading products…" />
  if (error) return <ErrorState message={error} onRetry={onRetry} />
  if (products.length === 0) {
    return <EmptyState message="No product categories match your search." />
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <BaseProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}

export default BaseProductGrid
