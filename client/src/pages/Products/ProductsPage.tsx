import { type FC } from 'react'

const ProductsPage: FC = () => {
  return (
    <div style={{ padding: '120px 28px', minHeight: '60vh', textAlign: 'center' }}>
      <h1 className="font-display text-metallic" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800 }}>Products</h1>
      <p style={{ marginTop: 24, color: '#86868B' }}>This is the dedicated Products page placeholder.</p>
    </div>
  )
}

export default ProductsPage

