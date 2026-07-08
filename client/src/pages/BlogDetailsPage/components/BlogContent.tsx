import type { FC } from 'react'
import styles from './BlogContent.module.css'

interface BlogContentProps {
  content: string
}

const BlogContent: FC<BlogContentProps> = ({ content }) => {
  if (!content.trim()) return null

  return (
    <article
      className={styles.article}
      // Backend stores rich HTML content for blogs.
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default BlogContent
