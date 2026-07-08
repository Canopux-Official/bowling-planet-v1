import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import type { Product } from '../../types/product'
import { SITE } from '../../constants/site'
import {
  absoluteUrl,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildOrganizationSchema,
  buildProductSchema,
  toJsonLd,
} from '../../utils/seo'

interface ProductSeoProps {
  product: Product
}

const ProductSeo: FC<ProductSeoProps> = ({ product }) => {
  const canonical = absoluteUrl(product.seo.canonicalPath)
  const ogImage = absoluteUrl(product.seo.ogImage)

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: product.name, path: product.seo.canonicalPath },
  ])

  return (
    <Helmet>
      <title>{product.seo.title}</title>
      <meta name="description" content={product.seo.description} />
      <meta name="keywords" content={product.seo.keywords.join(', ')} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="product" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={product.seo.title} />
      <meta property="og:description" content={product.seo.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={SITE.locale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={product.seo.title} />
      <meta name="twitter:description" content={product.seo.description} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">{toJsonLd(buildOrganizationSchema())}</script>
      <script type="application/ld+json">{toJsonLd(breadcrumb)}</script>
      <script type="application/ld+json">{toJsonLd(buildProductSchema(product))}</script>
      <script type="application/ld+json">{toJsonLd(buildFaqSchema(product.faqs))}</script>
    </Helmet>
  )
}

interface BreadcrumbsProps {
  productName: string
}

export const ProductBreadcrumbs: FC<BreadcrumbsProps> = ({ productName }) => (
  <nav aria-label="Breadcrumb" style={{ marginBottom: 28 }}>
    <ol
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        listStyle: 'none',
        padding: 0,
        margin: 0,
        fontSize: 13,
        color: '#86868B',
      }}
    >
      <li>
        <Link to="/" style={{ color: '#86868B', textDecoration: 'none' }}>
          Home
        </Link>
      </li>
      <li aria-hidden="true">/</li>
      <li>
        <Link to="/products" style={{ color: '#86868B', textDecoration: 'none' }}>
          Products
        </Link>
      </li>
      <li aria-hidden="true">/</li>
      <li style={{ color: '#F5F5F7' }} aria-current="page">
        {productName}
      </li>
    </ol>
  </nav>
)

export default ProductSeo
