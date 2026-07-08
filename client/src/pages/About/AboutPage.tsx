import { type FC } from 'react'

const AboutPage: FC = () => {
  return (
    <div style={{ padding: '120px 28px', minHeight: '60vh', textAlign: 'center' }}>
      <h1 className="font-display text-metallic" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800 }}>About Us</h1>
      <p style={{ marginTop: 24, color: '#86868B' }}>This is the dedicated About page placeholder.</p>
    </div>
  )
}

export default AboutPage

