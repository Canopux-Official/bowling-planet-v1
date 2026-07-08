import type { Product, ProductFAQ } from '../types/product'
import { SITE } from '../constants/site'

export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.legalName,
    url: SITE.url,
    email: SITE.email,
    description: SITE.description,
    logo: absoluteUrl('/logo.avif'),
  }
}

export function buildBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function buildProductSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.seo.description,
    image: absoluteUrl(product.heroImage),
    brand: {
      '@type': 'Brand',
      name: SITE.name,
    },
    category: product.category,
    url: absoluteUrl(product.seo.canonicalPath),
  }
}

export function buildFaqSchema(faqs: ProductFAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function toJsonLd(data: unknown): string {
  return JSON.stringify(data)
}
