import type { FC } from 'react'
import { Link } from 'react-router-dom'
import type { BlogListItem } from '../../services/blogsApi'
import Tag from '../../../../components/common/Tag'
import { theme } from '../../../../theme'

interface BlogCardProps {
  blog: BlogListItem
}

function formatDate(value?: string): string {
  if (!value) return ''
  return new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

const ACCENT_COLORS = ['#5FC1D1', '#6DBD4E', '#C084FC', '#FFAA33']

const BlogCard: FC<BlogCardProps> = ({ blog }) => {
  const accent = ACCENT_COLORS[(blog.title.charCodeAt(0) ?? 0) % ACCENT_COLORS.length]

  return (
    <Link
      to={`/blog/${blog.slug}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        color: 'inherit',
        background: `linear-gradient(180deg, ${accent}06, rgba(255,255,255,0.01))`,
        border: `1px solid ${accent}18`,
        borderRadius: 20,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = `${accent}40`
        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = `0 12px 32px ${accent}12`
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = `${accent}18`
        ;(e.currentTarget as HTMLElement).style.transform = 'none'
        ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
      }}
    >
      {/* Top accent line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${accent}, transparent)`, zIndex: 1 }} />

      {blog.coverImage ? (
        <div style={{ aspectRatio: '16/9', background: theme.colors.surface2, overflow: 'hidden' }}>
          <img src={blog.coverImage.url} alt={blog.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      ) : (
        <div style={{ aspectRatio: '16/9', background: `linear-gradient(135deg, ${accent}10, rgba(255,255,255,0.02))` }} aria-hidden="true" />
      )}

      <div style={{ padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <h3 className="font-display" style={{ margin: 0, fontSize: 16, fontWeight: 700, color: theme.colors.text1, letterSpacing: '-0.02em', lineHeight: 1.35 }}>
          {blog.title}
        </h3>
        {blog.excerpt ? (
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.65, color: theme.colors.text2, fontFamily: theme.typography.fontBody }}>
            {blog.excerpt}
          </p>
        ) : null}
        <p style={{ margin: 0, fontSize: 12, color: theme.colors.text3, fontFamily: theme.typography.fontBody }}>
          {blog.author}{blog.publishedAt ? ` · ${formatDate(blog.publishedAt)}` : ''}
        </p>
        {blog.tags.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
            {blog.tags.slice(0, 3).map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  )
}

export default BlogCard
