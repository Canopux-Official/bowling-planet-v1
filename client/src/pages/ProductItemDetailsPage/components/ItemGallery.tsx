import { type FC, useState } from 'react'
import type { IMedia } from '../services/mockProductItems'
import MediaItem from '../../../components/common/MediaItem'
import Lightbox from '../../../components/common/Lightbox'
import styles from './ItemGallery.module.css'

interface ItemGalleryProps {
  thumbnail: IMedia
  gallery?: IMedia[]
  title: string
}

const ItemGallery: FC<ItemGalleryProps> = ({ thumbnail, gallery, title }) => {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const extras = gallery ?? []
  const allMedia = [thumbnail, ...extras]

  const openAt = (i: number) => {
    setIndex(i)
    setOpen(true)
  }

  return (
    <section className={styles.section} aria-label={`${title} gallery`}>
      <button
        type="button"
        className={styles.hero}
        onClick={() => openAt(0)}
        aria-label={`View ${title}`}
      >
        <MediaItem media={thumbnail} alt={title} />
      </button>

      {extras.length > 0 ? (
        <div className={styles.grid}>
          {extras.map((media, i) => (
            <button
              key={`${media.url}-${i}`}
              type="button"
              className={styles.thumbBtn}
              onClick={() => openAt(i + 1)}
              aria-label={`View gallery image ${i + 1}`}
            >
              <MediaItem media={media} alt={`${title} ${i + 1}`} />
            </button>
          ))}
        </div>
      ) : null}

      <Lightbox
        media={allMedia}
        initialIndex={index}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </section>
  )
}

export default ItemGallery
