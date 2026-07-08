import type { FC } from 'react'
import Tag from '../../../components/common/Tag'
import styles from './BlogHeader.module.css'

interface BlogHeaderProps {
  title: string
  author: string
  publishedAt?: string
  tags: string[]
}

function formatDate(value?: string): string {
  if (!value) return ''
  return new Date(value).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const BlogHeader: FC<BlogHeaderProps> = ({ title, author, publishedAt, tags }) => (
  <header className={styles.header}>
    <h1 className={styles.title}>{title}</h1>
    <p className={styles.meta}>
      {author}
      {publishedAt ? ` · ${formatDate(publishedAt)}` : ''}
    </p>
    {tags.length > 0 ? (
      <div className={styles.tags}>
        {tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>
    ) : null}
  </header>
)

export default BlogHeader
