import type { FC } from 'react'
import type { IBulletList } from '../services/mockProductItems'
import styles from './ItemFeatureList.module.css'

interface ItemFeatureListProps {
  featureList?: IBulletList[]
}

const ItemFeatureList: FC<ItemFeatureListProps> = ({ featureList }) => {
  if (!featureList || featureList.length === 0) return null

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Features</h2>
      {featureList.map((group) => (
        <div key={group.heading} className={styles.group}>
          <h3 className={styles.groupTitle}>{group.heading}</h3>
          <ul className={styles.list}>
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}

export default ItemFeatureList
