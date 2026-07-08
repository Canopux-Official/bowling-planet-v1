import type { FC } from 'react'
import { Link } from 'react-router-dom'
import type { IProductItem } from '../services/baseProductDetailsApi'
import MediaItem from '../../../components/common/MediaItem'
import styles from './ProductItemCard.module.css'

interface ProductItemCardProps {
  item: IProductItem
}

function truncate(text: string, max = 120): string {
  if (text.length <= max) return text
  return `${text.slice(0, max).trimEnd()}…`
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

const ProductItemCard: FC<ProductItemCardProps> = ({ item }) => (
  <Link
    to={`/products/${item.baseProduct.slug}/${item.slug}`}
    className={styles.card}
  >
    <div className={styles.thumb}>
      <MediaItem media={item.thumbnail} alt={item.title} />
    </div>
    <div className={styles.body}>
      <h3 className={styles.title}>{item.title}</h3>
      {item.description ? (
        <p className={styles.description}>{truncate(item.description)}</p>
      ) : null}
      <div className={styles.meta}>
        {item.price !== undefined ? (
          <span className={styles.price}>{formatPrice(item.price)}</span>
        ) : null}
        {item.purchaseCount > 0 ? (
          <span className={styles.purchased}>{item.purchaseCount} purchased</span>
        ) : null}
      </div>
    </div>
  </Link>
)

export default ProductItemCard
