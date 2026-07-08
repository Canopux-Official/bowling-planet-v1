import { type FC } from 'react'

const BlogPage: FC = () => {
  return (
    <div style={{ padding: '120px 28px', minHeight: '60vh', textAlign: 'center' }}>
      <h1 className="font-display text-metallic" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800 }}>Blog</h1>
      <p style={{ marginTop: 24, color: '#86868B' }}>This is the dedicated Blog page placeholder.</p>
    </div>
  )
}

export default BlogPage
