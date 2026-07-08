/**
 * Product service — thin data access layer.
 * Replace with Axios when backend endpoints are ready:
 *   GET /api/products?category=&q=&page=&sort=
 *   GET /api/products/:slug
 */

import {
  ALL_APPLICATIONS,
  ALL_INDUSTRIES,
  DEFAULT_PRODUCT_SLUG,
  PRODUCT_LIST,
  PRODUCTS,
} from '../data/products'
import type {
  Product,
  ProductFilterState,
  ProductListItem,
  ProductQueryResult,
} from '../types/product'
import { PAGE_SIZE } from '../types/product'

const delay = (ms = 0) => new Promise<void>((r) => setTimeout(r, ms))

export function createDefaultFilters(): ProductFilterState {
  return {
    category: 'All',
    industries: [],
    businessTypes: [],
    applications: [],
    search: '',
    sort: 'featured',
    page: 1,
  }
}

function applyFilters(items: ProductListItem[], filters: ProductFilterState): ProductListItem[] {
  let next = [...items]

  if (filters.category !== 'All') {
    next = next.filter((p) => p.category === filters.category)
  }
  if (filters.industries.length) {
    next = next.filter((p) => filters.industries.some((i) => p.industries.includes(i)))
  }
  if (filters.businessTypes.length) {
    next = next.filter((p) => filters.businessTypes.some((b) => p.businessTypes.includes(b)))
  }
  if (filters.applications.length) {
    next = next.filter((p) =>
      filters.applications.some((a) => p.applicationTags.includes(a)),
    )
  }
  if (filters.search.trim()) {
    const q = filters.search.trim().toLowerCase()
    next = next.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.industries.some((i) => i.toLowerCase().includes(q)),
    )
  }

  switch (filters.sort) {
    case 'name-asc':
      next.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'name-desc':
      next.sort((a, b) => b.name.localeCompare(a.name))
      break
    case 'newest':
      next.reverse()
      break
    case 'featured':
    default:
      next.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
      break
  }

  return next
}

export async function queryProducts(filters: ProductFilterState): Promise<ProductQueryResult> {
  await delay()
  const filtered = applyFilters(PRODUCT_LIST, filters)
  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const page = Math.min(Math.max(1, filters.page), totalPages)
  const start = (page - 1) * PAGE_SIZE
  const items = filtered.slice(start, start + PAGE_SIZE)

  return { items, total, page, pageSize: PAGE_SIZE, totalPages }
}

export async function getAllProducts(): Promise<ProductListItem[]> {
  await delay()
  return PRODUCT_LIST
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await delay()
  return PRODUCTS.find((p) => p.slug === slug) ?? null
}

export async function getDefaultProduct(): Promise<Product> {
  const product = await getProductBySlug(DEFAULT_PRODUCT_SLUG)
  if (!product) throw new Error('Default product missing from catalogue')
  return product
}

export async function getFilterOptions() {
  await delay()
  return {
    industries: ALL_INDUSTRIES,
    applications: ALL_APPLICATIONS,
  }
}

const productService = {
  createDefaultFilters,
  queryProducts,
  getAllProducts,
  getProductBySlug,
  getDefaultProduct,
  getFilterOptions,
}

export default productService
