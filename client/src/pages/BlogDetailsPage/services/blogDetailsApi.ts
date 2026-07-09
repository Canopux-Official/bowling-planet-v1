
import { apiClient } from '../../../services/apiClient'
import type { ApiListResponse, ApiResponse, BlogListItem, IBlog } from '../../InsightsPage/types'

export type { BlogListItem, IBlog }

const BASE = '/blog'

// GET /api/blogs/:slug
export const getBlogBySlug = async (slug: string): Promise<IBlog> => {
  const url = `${BASE}/${slug}`

  const res = await apiClient(url, {
    method: 'GET',
    headers: { 'x-skip-auth-refresh': 'true' }
  }) as ApiResponse<IBlog>

  return res.data
}

// GET /api/blogs/:slug/related
export const getRelatedBlogs = async (
  slug: string,
  limit = 3
): Promise<BlogListItem[]> => {
  // Append limit as a query parameter string
  const url = `${BASE}/${slug}/related?limit=${limit}`

  const res = await apiClient(url, {
    method: 'GET',
    headers: { 'x-skip-auth-refresh': 'true' }
  }) as ApiListResponse<BlogListItem>

  return res.data
}