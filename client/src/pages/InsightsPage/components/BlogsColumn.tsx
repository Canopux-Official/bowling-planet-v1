import { type FC, useCallback, useEffect, useState } from 'react'
import Loader from '../../../components/common/Loader'
import ErrorState from '../../../components/common/ErrorState'
import EmptyState from '../../../components/common/EmptyState'
import Tag from '../../../components/common/Tag'
import {
  getPublishedBlogs,
  type BlogListItem,
  type IPaginationMeta,
} from '../services/blogsApi'
import BlogCard from './BlogsColumn/BlogCard'
import BlogsPagination from './BlogsColumn/BlogsPagination'
import styles from './BlogsColumn.module.css'

const BlogsColumn: FC = () => {
  const [blogs, setBlogs] = useState<BlogListItem[]>([])
  const [meta, setMeta] = useState<IPaginationMeta>({
    page: 1,
    limit: 4,
    total: 0,
    totalPages: 0,
  })
  const [tag, setTag] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [availableTags, setAvailableTags] = useState<string[]>([])

  // Load once on mount, unfiltered and unpaginated (within reason), purely
  // to build the tag filter list. There's no dedicated tags endpoint on the
  // backend yet — if one gets added, replace this with that call.
  useEffect(() => {
    let cancelled = false

    const loadTags = async () => {
      try {
        const data = await getPublishedBlogs({ page: 1, limit: 100 })
        if (cancelled) return
        const tags = Array.from(new Set(data.blogs.flatMap((b) => b.tags))).sort()
        setAvailableTags(tags)
      } catch {
        // Non-critical — filter bar just won't populate. Main list load
        // below still runs and will surface its own error state.
      }
    }

    void loadTags()
    return () => {
      cancelled = true
    }
  }, [])

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getPublishedBlogs({
        page,
        limit: 4,
        tag: tag || undefined,
      })
      setBlogs(data.blogs)
      setMeta(data.meta)
    } catch {
      setError('Unable to load blogs.')
    } finally {
      setLoading(false)
    }
  }, [page, tag])

  useEffect(() => {
    void load()
  }, [load])

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

      {loading ? <Loader label="Loading blogs…" /> : null}
      {error ? <ErrorState message={error} onRetry={() => void load()} /> : null}
      {!loading && !error && blogs.length === 0 ? (
        <EmptyState message="No published blogs found." />
      ) : null}

      {!loading && !error && blogs.length > 0 ? (
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