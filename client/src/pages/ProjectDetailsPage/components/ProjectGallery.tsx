import { type FC, useState } from 'react'

import MediaItem from '../../../components/common/MediaItem'
import Lightbox from '../../../components/common/Lightbox'
import styles from './ProjectGallery.module.css'
import type { IMedia } from '../../ProjectsPage/types'

interface ProjectGalleryProps {
  media?: IMedia[]
}

const ProjectGallery: FC<ProjectGalleryProps> = ({ media }) => {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  if (!media || media.length === 0) return null

  return (
    <>
      <section className={styles.section} aria-labelledby="gallery-heading">
        <h2 id="gallery-heading" className={styles.heading}>
          Gallery
        </h2>
        <div className={styles.gallery}>
          {media.map((item, i) => (
            <button
              key={`${item.url}-${i}`}
              type="button"
              className={styles.item}
              onClick={() => {
                setIndex(i)
                setOpen(true)
              }}
              aria-label={`Open media ${i + 1}`}
            >
              <MediaItem media={item} alt="" />
            </button>
          ))}
        </div>
      </section>
      <Lightbox
        media={media}
        initialIndex={index}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  )
}

export default ProjectGallery