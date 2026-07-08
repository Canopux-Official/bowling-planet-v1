import type { FC } from 'react'
import type { IMedia } from '../../pages/ProjectsPage/services/projectsApi'
import styles from './MediaItem.module.css'

interface MediaItemProps {
  media: IMedia
  alt?: string
  className?: string
  controls?: boolean
}

const MediaItem: FC<MediaItemProps> = ({ media, alt = '', className, controls = false }) => {
  if (media.type === 'video') {
    return (
      <video
        className={`${styles.media} ${className ?? ''}`}
        src={media.url}
        controls={controls}
        playsInline
      />
    )
  }

  return (
    <img
      className={`${styles.media} ${className ?? ''}`}
      src={media.url}
      alt={alt}
      loading="lazy"
    />
  )
}

export default MediaItem
