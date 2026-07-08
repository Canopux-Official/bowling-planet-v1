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
    <h1 className={styles.title}>{title}</h1>
    {description ? <p className={styles.description}>{description}</p> : null}
    {price !== undefined ? (
      <p className={styles.price}>{formatPrice(price)}</p>
    ) : null}
  </header>
)

export default ItemHeader
