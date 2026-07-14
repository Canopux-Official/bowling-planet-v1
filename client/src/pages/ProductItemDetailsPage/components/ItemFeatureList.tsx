import type { FC } from 'react'

import styles from './ItemFeatureList.module.css'
import type { IBulletList } from '../../ProjectsPage/types'

interface ItemFeatureListProps {
  featureList?: IBulletList[]
}

const ItemFeatureList: FC<ItemFeatureListProps> = ({ featureList }) => {
  if (!featureList || featureList.length === 0) return null

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Features</h2>
      <div className={styles.grid}>
        {featureList.map((group) => (
          <div key={group.heading} className={styles.group}>
            <h3 className={styles.groupTitle}>{group.heading}</h3>
            <ul className={styles.list}>
              {group.items.map((item) => (
                <li key={item} className={styles.listItem}>
                  <svg
                    className={styles.checkIcon}
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8.5L6.5 12L13 4.5"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ItemFeatureList