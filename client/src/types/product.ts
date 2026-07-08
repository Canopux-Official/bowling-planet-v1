/**
 * Product domain types — API-ready shapes for future backend integration.
 */

export interface ProductOverview {
  industries: string[]
  spaceRequired: string
  capacity: string
  applications: string[]
  installation: string
}

export interface ProductBenefit {
  id: string
  title: string
  description: string
  metric?: string
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  caption?: string
}

export interface ProductSpec {
  label: string
  value: string
}

export interface ProductFeature {
  id: string
  title: string
  description: string
  image: string
  imageAlt: string
}

export interface ProductApplication {
  id: string
  title: string
  description: string
}

export interface ProductIndustry {
  id: string
  title: string
  description: string
}

export interface WhyPoint {
  id: string
  title: string
  description: string
}

export interface CaseStudySummary {
  id: string
  slug: string
  title: string
  location: string
  overview: string
  image: string
  imageAlt: string
  tags: string[]
}

export interface RelatedProduct {
  id: string
  slug: string
  name: string
  category: string
  summary: string
  image: string
  imageAlt: string
}

export interface ProductFAQ {
  id: string
  question: string
  answer: string
}

export interface ProductSEO {
  title: string
  description: string
  canonicalPath: string
  ogImage: string
  keywords: string[]
}

/** Catalogue / filter dimensions */
export type ProductCategory =
  | 'Major Attractions'
  | 'Bowling'
  | 'Arcade & Video'
  | 'Redemption'
  | 'Prize Vending'
  | 'VR Games'
  | 'Kiddie Rides'
  | 'Carnivals'
  | 'Debit Card Systems'
  | 'Pre-Owned'
  | 'Spares & Consumables'

export type BusinessType =
  | 'Turnkey FEC'
  | 'Mall Entertainment'
  | 'Hotel & Resort'
  | 'Standalone Zone'
  | 'Expansion Module'

export type SortOption = 'featured' | 'name-asc' | 'name-desc' | 'newest'

export interface Product {
  id: string
  slug: string
  name: string
  category: ProductCategory
  industries: string[]
  businessTypes: BusinessType[]
  applicationTags: string[]
  tagline: string
  headline: string
  subheadline: string
  heroImage: string
  heroImageAlt: string
  brochureUrl?: string
  featured?: boolean
  overview: ProductOverview
  benefits: ProductBenefit[]
  gallery: GalleryImage[]
  specifications: ProductSpec[]
  features: ProductFeature[]
  applications: ProductApplication[]
  industrySections: ProductIndustry[]
  whyBowlingPlanet: WhyPoint[]
  caseStudies: CaseStudySummary[]
  relatedProducts: RelatedProduct[]
  faqs: ProductFAQ[]
  seo: ProductSEO
}

export interface ProductListItem {
  id: string
  slug: string
  name: string
  category: ProductCategory
  industries: string[]
  businessTypes: BusinessType[]
  applicationTags: string[]
  tagline: string
  image: string
  imageAlt: string
  featured?: boolean
}

export interface ProductFilterState {
  category: ProductCategory | 'All'
  industries: string[]
  businessTypes: BusinessType[]
  applications: string[]
  search: string
  sort: SortOption
  page: number
}

export interface ProductQueryResult {
  items: ProductListItem[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export const PRODUCT_CATEGORIES: Array<ProductCategory | 'All'> = [
  'All',
  'Major Attractions',
  'Bowling',
  'Arcade & Video',
  'Redemption',
  'Prize Vending',
  'VR Games',
  'Kiddie Rides',
  'Carnivals',
  'Debit Card Systems',
  'Pre-Owned',
  'Spares & Consumables',
]

export const BUSINESS_TYPES: BusinessType[] = [
  'Turnkey FEC',
  'Mall Entertainment',
  'Hotel & Resort',
  'Standalone Zone',
  'Expansion Module',
]

export const PAGE_SIZE = 9
