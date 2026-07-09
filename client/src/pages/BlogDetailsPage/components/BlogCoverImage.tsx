import type { FC } from 'react'

import styles from './BlogCoverImage.module.css'
import type { IMedia } from '../../InsightsPage/types'

interface BlogCoverImageProps {
  coverImage?: IMedia
  title: string
}

const BlogCoverImage: FC<BlogCoverImageProps> = ({ coverImage, title }) => {
  if (!coverImage) return null

  return (
    <div className={styles.cover}>
      <img src={coverImage.url} alt={title} />
    </div>
  )
}

export default BlogCoverImage
