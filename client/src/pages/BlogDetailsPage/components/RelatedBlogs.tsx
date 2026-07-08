import type { FC } from 'react'
import type { BlogListItem } from '../services/blogDetailsApi'
import RelatedBlogCard from './RelatedBlogs/RelatedBlogCard'
import styles from './RelatedBlogs.module.css'

interface RelatedBlogsProps {
  blogs: BlogListItem[]
}

const RelatedBlogs: FC<RelatedBlogsProps> = ({ blogs }) => {
  if (!blogs || blogs.length === 0) return null

  return (
    <section className={styles.section} aria-labelledby="related-blogs-heading">
      <h2 id="related-blogs-heading" className={styles.heading}>
        Related blogs
      </h2>
      <div className={styles.list}>
        {blogs.map((blog) => (
          <RelatedBlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </section>
  )
}

export default RelatedBlogs
