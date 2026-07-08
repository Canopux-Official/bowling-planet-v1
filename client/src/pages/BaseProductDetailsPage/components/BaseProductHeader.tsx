import type { FC } from 'react'
import type { IBaseProduct } from '../services/baseProductDetailsApi'
import MediaItem from '../../../components/common/MediaItem'
import styles from './BaseProductHeader.module.css'

interface BaseProductHeaderProps {
  product: IBaseProduct
}

const BaseProductHeader: FC<BaseProductHeaderProps> = ({ product }) => (
  <header className={styles.header}>
    <div className={styles.thumb}>
      <MediaItem media={product.thumbnail} alt={product.title} />
    </div>
    <div className={styles.copy}>
      <span className={styles.eyebrow}>Category</span>
      <h1 className={styles.title}>{product.title}</h1>
      {product.description ? (
        <p className={styles.description}>{product.description}</p>
      ) : null}
    </div>
  </header>
)

export default BaseProductHeader
