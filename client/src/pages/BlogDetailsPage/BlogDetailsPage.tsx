import { type FC, useCallback, useEffect, useState } from 'react'
import SEO from '../../components/SEO'
import { Link, useParams } from 'react-router-dom'
import Loader from '../../components/common/Loader'
import ErrorState from '../../components/common/ErrorState'
import {
  getBlogBySlug,
  getRelatedBlogs,
  type BlogListItem,
  type IBlog,
} from './services/blogDetailsApi'
import BlogHeader from './components/BlogHeader'
import BlogCoverImage from './components/BlogCoverImage'
import BlogContent from './components/BlogContent'
import RelatedBlogs from './components/RelatedBlogs'
import styles from './BlogDetailsPage.module.css'

const BlogDetailsPage: FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [blog, setBlog] = useState<IBlog | null>(null)
  const [related, setRelated] = useState<BlogListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!slug) {
      setError('Blog not found.')
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    try {
      const [detail, relatedItems] = await Promise.all([
        getBlogBySlug(slug),
        getRelatedBlogs(slug),
      ])
      setBlog(detail)
      setRelated(relatedItems)
    } catch {
      setError('Unable to load this blog.')
      setBlog(null)
      setRelated([])
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => {
    void load()
  }, [load])

  if (loading) {
    return (
      <main className={styles.page}>
        <Loader label="Loading blog…" />
      </main>
    )
  }

  if (error || !blog) {
    return (
      <main className={styles.page}>
        <div className={styles.missing}>
          <ErrorState
            message={error ?? 'Blog not found.'}
            onRetry={error ? () => void load() : undefined}
          />
          <p>
            <Link to="/blog">Back to insights</Link>
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.page}>
      <SEO 
        title={blog.title} 
        description={blog.excerpt || blog.title}
        ogImage={blog.coverImage?.url}
      />
      <BlogHeader
        title={blog.title}
        author={blog.author}
        publishedAt={blog.publishedAt}
        tags={blog.tags}
      />
      <BlogCoverImage coverImage={blog.coverImage} title={blog.title} />
      <BlogContent content={blog.content} />
      <RelatedBlogs blogs={related} />
    </main>
  )
}

export default BlogDetailsPage
