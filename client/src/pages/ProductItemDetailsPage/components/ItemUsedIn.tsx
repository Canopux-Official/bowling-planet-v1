import type { FC } from 'react'

import MediaItem from '../../../components/common/MediaItem'
import styles from './ItemUsedIn.module.css'
import type { IUsageLocation } from '../types'

interface ItemUsedInProps {
  usedIn?: IUsageLocation[]
}

const ItemUsedIn: FC<ItemUsedInProps> = ({ usedIn }) => {
  if (!usedIn || usedIn.length === 0) return null

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Used in</h2>
      {usedIn.map((location) => (
        <article key={location.name} className={styles.location}>
          <h3 className={styles.name}>{location.name}</h3>
          {location.description ? (
            <p className={styles.description}>{location.description}</p>
          ) : null}
          {location.images && location.images.length > 0 ? (
            <div className={styles.images}>
              {location.images.map((media, i) => (
                <div key={`${media.url}-${i}`} className={styles.image}>
                  <MediaItem media={media} alt={`${location.name} ${i + 1}`} />
                </div>
              ))}
            </div>
          ) : null}
        </article>
      ))}
    </section>
  )
}

export default ItemUsedIn
