import type { FC } from 'react'
import { Link } from 'react-router-dom'
import type { IProductItemRef } from '../services/mockProductItems'
import styles from './ItemParentLink.module.css'

interface ItemParentLinkProps {
  baseProduct: IProductItemRef
}

const ItemParentLink: FC<ItemParentLinkProps> = ({ baseProduct }) => (
  <Link to={`/products/${baseProduct.slug}`} className={styles.link}>
    ← Back to {baseProduct.title}
  </Link>
)

export default ItemParentLink
