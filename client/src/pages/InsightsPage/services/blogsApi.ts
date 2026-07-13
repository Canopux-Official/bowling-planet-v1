
import { apiClient } from "../../../services/apiClient"
import type { ApiListResponse, BlogListItem, IPaginationMeta } from "../types"

export type { BlogListItem, IPaginationMeta }

export interface GetPublishedBlogsParams {
  page?: number
  limit?: number
  tag?: string
}

export interface GetPublishedBlogsResponse {
  blogs: BlogListItem[]
  meta: IPaginationMeta
}

const BASE = '/blog'

// GET /api/blogs
export const getPublishedBlogs = async (
  params: GetPublishedBlogsParams = {}
): Promise<GetPublishedBlogsResponse> => {
  // 1. Construct URL search parameters
  const searchParams = new URLSearchParams()
  searchParams.append('page', String(params.page ?? 1))
  searchParams.append('limit', String(params.limit ?? 9))
  
  if (params.tag) {
    searchParams.append('tag', params.tag)
  }

  const url = `${BASE}?${searchParams.toString()}`

  // 2. Call apiClient directly with the required config and skip-refresh flag
  const res = await apiClient(url, {
    method: 'GET',
    headers: { 'x-skip-auth-refresh': 'true' }
  }) as ApiListResponse<BlogListItem>

  // 3. Return mapping matching the backend's sibling "pagination" property
  return {
    blogs: res.data,
    meta: res.meta, // Extracted from res.pagination based on your backend types
  }
}
