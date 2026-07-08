import type { FC } from 'react'
import { Link } from 'react-router-dom'
import type { BlogListItem } from '../../services/blogsApi'
import Tag from '../../../../components/common/Tag'
import styles from './BlogCard.module.css'

interface BlogCardProps {
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

const BlogCard: FC<BlogCardProps> = ({ blog }) => (
  <Link to={`/blog/${blog.slug}`} className={styles.card}>
    <div className={styles.cover}>
      {blog.coverImage ? (
        <img src={blog.coverImage.url} alt={blog.title} loading="lazy" />
      ) : (
        <div className={styles.placeholder} aria-hidden="true" />
      )}
    </div>
    <div className={styles.body}>
      <h3 className={styles.title}>{blog.title}</h3>
      {blog.excerpt ? <p className={styles.excerpt}>{blog.excerpt}</p> : null}
      <p className={styles.meta}>
        {blog.author}
        {blog.publishedAt ? ` · ${formatDate(blog.publishedAt)}` : ''}
      </p>
      {blog.tags.length > 0 ? (
        <div className={styles.tags}>
          {blog.tags.slice(0, 3).map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      ) : null}
    </div>
  </Link>
)

export default BlogCard
