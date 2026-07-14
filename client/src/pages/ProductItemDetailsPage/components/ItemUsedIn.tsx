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
      <div className={styles.list}>
        {usedIn.map((location) => {
          const [hero, ...rest] = location.images ?? []

          return (
            <article key={location.name} className={styles.location}>
              {hero ? (
                <div className={styles.hero}>
                  <MediaItem media={hero} alt={location.name} />
                  <div className={styles.heroScrim} aria-hidden="true" />
                  <h3 className={styles.heroName}>{location.name}</h3>
                </div>
              ) : (
                <h3 className={styles.name}>{location.name}</h3>
              )}

              {location.description ? (
                <p className={styles.description}>{location.description}</p>
              ) : null}

              {rest.length > 0 ? (
                <div className={styles.filmstrip}>
                  {rest.map((media, i) => (
                    <div key={`${media.url}-${i}`} className={styles.thumb}>
                      <MediaItem media={media} alt={`${location.name} ${i + 2}`} />
                    </div>
                  ))}
                </div>
              ) : null}
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default ItemUsedIn