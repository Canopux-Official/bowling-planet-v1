import type { FC } from 'react'
import { Link } from 'react-router-dom'
import type { BlogListItem } from '../../services/blogDetailsApi'
import styles from './RelatedBlogCard.module.css'

interface RelatedBlogCardProps {
  blog: BlogListItem
}

function formatDate(value?: string): string {
  if (!value) return ''
  return new Date(value).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const RelatedBlogCard: FC<RelatedBlogCardProps> = ({ blog }) => (
  <Link to={`/blog/${blog.slug}`} className={styles.card}>
    <div className={styles.thumb}>
      {blog.coverImage ? (
        <img src={blog.coverImage.url} alt={blog.title} loading="lazy" />
      ) : (
        <div className={styles.placeholder} aria-hidden="true" />
      )}
    </div>
    <div>
      <h3 className={styles.title}>{blog.title}</h3>
      {blog.publishedAt ? (
        <p className={styles.date}>{formatDate(blog.publishedAt)}</p>
      ) : null}
    </div>
  </Link>
)

export default RelatedBlogCard
