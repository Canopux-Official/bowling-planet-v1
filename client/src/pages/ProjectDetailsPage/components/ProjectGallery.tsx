import { type FC, useState } from 'react'
import type { IMedia } from '../../ProjectsPage/services/projectsApi'
import MediaItem from '../../../components/common/MediaItem'
import Lightbox from '../../../components/common/Lightbox'
import styles from './ProjectGallery.module.css'

interface ProjectGalleryProps {
  media?: IMedia[]
}

const ProjectGallery: FC<ProjectGalleryProps> = ({ media }) => {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  if (!media || media.length === 0) return null

  return (
    <>
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
