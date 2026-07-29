import { type FC, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Loader from '../../../components/common/Loader'
import ErrorState from '../../../components/common/ErrorState'
import EmptyState from '../../../components/common/EmptyState'
import Tag from '../../../components/common/Tag'
import {
  getPublishedBlogs,
} from '../services/blogsApi'
import BlogCard from './BlogsColumn/BlogCard'
import BlogsPagination from './BlogsColumn/BlogsPagination'
import styles from './BlogsColumn.module.css'

const BlogsColumn: FC = () => {
  const [tag, setTag] = useState('')
  const [page, setPage] = useState(1)

  const { data: tagsData } = useQuery({
    queryKey: ['public-blogs-tags'],
    queryFn: async () => {
      const data = await getPublishedBlogs({ page: 1, limit: 100 })
      return Array.from(new Set(data.blogs.flatMap((b) => b.tags))).sort()
    },
    staleTime: 5 * 60 * 1000,
  })

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['public-blogs', page, tag],
    queryFn: async () => {
      return await getPublishedBlogs({
        page,
        limit: 4,
        tag: tag || undefined,
      })
    },
    staleTime: 5 * 60 * 1000,
  })

  const availableTags = tagsData || []
  const blogs = data?.blogs || []
  const meta = data?.meta || { page: 1, limit: 4, total: 0, totalPages: 0 }

  return (
    <section className={styles.column} aria-labelledby="blogs-heading">
      <h2 id="blogs-heading" className={styles.heading}>
        Blogs
      </h2>

      <div className={styles.filters}>
        <span className={styles.label}>Tags</span>
        <Tag
          label="All"
          active={!tag}
          onClick={() => {
            setTag('')
            setPage(1)
          }}
        />
        {availableTags.map((item) => (
          <Tag
            key={item}
            label={item}
            active={tag === item}
            onClick={() => {
              setTag(item)
              setPage(1)
            }}
          />
        ))}
      </div>

      {isLoading ? <Loader label="Loading blogs…" /> : null}
      {error ? <ErrorState message="Unable to load blogs." onRetry={() => void refetch()} /> : null}
      {!isLoading && !error && blogs.length === 0 ? (
        <EmptyState message="No published blogs found." />
      ) : null}

      {!isLoading && !error && blogs.length > 0 ? (
        <>
          <div className={styles.list}>
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
          <BlogsPagination meta={meta} onPageChange={setPage} />
        </>
      ) : null}
    </section>
  )
}

export default BlogsColumn
