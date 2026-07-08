import type { FC } from 'react'
import styles from './MediaItem.module.css'

// Shared media shape used by Projects and Products modules.
export interface CommonMedia {
  type: 'image' | 'video'
  url: string
  publicId?: string
}

interface MediaItemProps {
  media: CommonMedia
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
