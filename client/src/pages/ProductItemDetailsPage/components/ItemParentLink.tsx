import type { FC } from 'react'
import { Link } from 'react-router-dom'

import styles from './ItemParentLink.module.css'
import type { IBaseProductRef } from '../types'

interface ItemParentLinkProps {
  baseProduct: IBaseProductRef
}

const ItemParentLink: FC<ItemParentLinkProps> = ({ baseProduct }) => (
  <Link to={`/products/${baseProduct.slug}`} className={styles.link}>
    ← Back to {baseProduct.title}
  </Link>
)

export default ItemParentLink
