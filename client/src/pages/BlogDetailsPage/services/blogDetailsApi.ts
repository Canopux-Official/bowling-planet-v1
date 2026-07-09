
import apiClient from '../../../hooks/apiClient'
import type { ApiListResponse, ApiResponse, BlogListItem, IBlog } from '../../InsightsPage/types'

export type { BlogListItem, IBlog }

const BASE = '/blog'

// GET /api/blogs/:slug
export const getBlogBySlug = async (slug: string): Promise<IBlog> => {
  const res = await apiClient.get<ApiResponse<IBlog>>(`${BASE}/${slug}`)
  return res.data
}

// GET /api/blogs/:slug/related
export const getRelatedBlogs = async (
  slug: string,
  limit = 3
): Promise<BlogListItem[]> => {
  // Note: the related-blogs route doesn't return meta, but reuse the
  // list envelope shape since data is still an array here.
  const res = await apiClient.get<ApiListResponse<BlogListItem>>(`${BASE}/${slug}/related`, { limit })
  return res.data
}