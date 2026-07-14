import type { FC } from 'react'
import styles from './ItemHeader.module.css'

interface ItemHeaderProps {
  title: string
  description?: string
  price?: number
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

const ItemHeader: FC<ItemHeaderProps> = ({ title, description, price }) => (
  <header className={styles.header}>
    <div className={styles.titleRow}>
      <h1 className={styles.title}>{title}</h1>
      {price !== undefined ? (
        <div className={styles.priceBadge}>
          <span className={styles.priceLabel}>Price</span>
          <span className={styles.price}>{formatPrice(price)}</span>
        </div>
      ) : null}
    </div>
    {description ? <p className={styles.description}>{description}</p> : null}
    <div className={styles.divider} aria-hidden="true" />
  </header>
)

export default ItemHeader