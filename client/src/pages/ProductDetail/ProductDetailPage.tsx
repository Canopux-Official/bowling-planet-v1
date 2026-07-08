/**
 * Product Detail Page — executive presentation for FEC solutions
 * Hero → Overview → Benefits → Gallery → Specs → Applications →
 * Features → Industries → Related → Case Studies → FAQs → CTA
 */
import { type FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { theme } from '../../theme'
import type { Product } from '../../types/product'
import { getProductBySlug } from '../../services/productService'
import ProductSeo from '../../components/product/ProductSeo'
import ProductHero from './components/ProductHero'
import ProductOverview from './components/ProductOverview'
import ProductBenefits from './components/ProductBenefits'
import ProductGallery from './components/ProductGallery'
import ProductSpecs from './components/ProductSpecs'
import ProductApplications from './components/ProductApplications'
import ProductFeatures from './components/ProductFeatures'
import ProductIndustries from './components/ProductIndustries'
import ProductRelated from './components/ProductRelated'
import ProductCaseStudies from './components/ProductCaseStudies'
import ProductFAQ from './components/ProductFAQ'
import ProductFinalCta from './components/ProductFinalCta'
import { fadeIn } from '../../animations/motion'

const ProductDetailPage: FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'missing'>('loading')

  useEffect(() => {
    let active = true
    setStatus('loading')
    if (!slug) {
      setStatus('missing')
      return
    }
    getProductBySlug(slug).then((data) => {
      if (!active) return
      if (!data) {
        setProduct(null)
        setStatus('missing')
        return
      }
      setProduct(data)
      setStatus('ready')
    })
    return () => {
      active = false
    }
  }, [slug])

  if (status === 'loading') {
    return (
      <div
        role="status"
        aria-live="polite"
        style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: theme.colors.text2,
          padding: '120px 28px',
        }}
      >
        Loading programme details…
      </div>
    )
  }

  if (status === 'missing' || !product) {
    return (
      <div style={{ padding: '140px 28px', textAlign: 'center', minHeight: '60vh' }}>
        <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: 16 }}>
          Programme not found
        </h1>
        <p style={{ color: theme.colors.text2, marginBottom: 32 }}>
          This solution page is unavailable or the link is incorrect.
        </p>
        <Link to="/products" className="btn btn-primary">
          View all solutions
        </Link>
      </div>
    )
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <ProductSeo product={product} />
      <ProductHero product={product} />
      <ProductOverview product={product} />
      <ProductBenefits product={product} />
      <ProductGallery product={product} />
      <ProductSpecs product={product} />
      <ProductApplications product={product} />
      <ProductFeatures product={product} />
      <ProductIndustries product={product} />
      <ProductRelated product={product} />
      <ProductCaseStudies product={product} />
      <ProductFAQ product={product} />
      <ProductFinalCta />
    </motion.div>
  )
}

export default ProductDetailPage
