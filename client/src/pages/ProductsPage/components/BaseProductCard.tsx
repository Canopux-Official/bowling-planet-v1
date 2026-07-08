import type { FC } from 'react'
import { Link } from 'react-router-dom'
import type { IBaseProduct } from '../services/baseProductsApi'
import MediaItem from '../../../components/common/MediaItem'
import styles from './BaseProductCard.module.css'

interface BaseProductCardProps {
  product: IBaseProduct
}

function truncate(text: string, max = 140): string {
  if (text.length <= max) return text
  return `${text.slice(0, max).trimEnd()}…`
}

const BaseProductCard: FC<BaseProductCardProps> = ({ product }) => (
  <Link to={`/products/${product.slug}`} className={styles.card}>
    <div className={styles.thumb}>
      <MediaItem media={product.thumbnail} alt={product.title} />
    </div>
    <div className={styles.body}>
      <h3 className={styles.title}>{product.title}</h3>
      {product.description ? (
        <p className={styles.description}>{truncate(product.description)}</p>
      ) : null}
    </div>
  </Link>
)

export default BaseProductCard
