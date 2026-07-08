import type { FC } from 'react'
import styles from './ItemPurchaseCTA.module.css'

interface ItemPurchaseCTAProps {
  hasPrice?: boolean
  onClick?: () => void
}

const ItemPurchaseCTA: FC<ItemPurchaseCTAProps> = ({
  hasPrice = true,
  onClick,
}) => (
  <div className={styles.wrap}>
    <button
      type="button"
      className={styles.btn}
      onClick={onClick ?? (() => undefined)}
    >
      {hasPrice ? 'Enquire' : 'Contact for pricing'}
    </button>
    <p className={styles.hint}>We’ll respond with availability and configuration options.</p>
  </div>
)

export default ItemPurchaseCTA
