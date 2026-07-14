import { type FC, useState } from 'react'

import MediaItem from '../../../components/common/MediaItem'
import Lightbox from '../../../components/common/Lightbox'
import styles from './ItemGallery.module.css'
import type { IMedia } from '../types'

interface ItemGalleryProps {
  thumbnail: IMedia
  gallery?: IMedia[]
  title: string
}

const ItemGallery: FC<ItemGalleryProps> = ({ thumbnail, gallery, title }) => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(0)

  const extras = gallery ?? []
  const allMedia = [thumbnail, ...extras]

  return (
    <section className={styles.section} aria-label={`${title} gallery`}>
      <div className={styles.layout}>
        {allMedia.length > 1 ? (
          <div className={styles.rail} role="tablist" aria-label="Select image">
            {allMedia.map((media, i) => (
              <button
                key={`${media.url}-${i}`}
                type="button"
                role="tab"
                aria-selected={selected === i}
                className={`${styles.thumbBtn} ${selected === i ? styles.thumbBtnActive : ''}`}
                onClick={() => setSelected(i)}
                aria-label={`View image ${i + 1}`}
              >
                <MediaItem media={media} alt="" />
              </button>
            ))}
          </div>
        ) : null}

        <button
          type="button"
          className={styles.hero}
          onClick={() => setOpen(true)}
          aria-label={`Zoom in on ${title}`}
        >
          <MediaItem media={allMedia[selected]} alt={title} />
          <span className={styles.zoomHint}>Click to zoom</span>
        </button>
      </div>

      <Lightbox
        media={allMedia}
        initialIndex={selected}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </section>
  )
}

export default ItemGallery