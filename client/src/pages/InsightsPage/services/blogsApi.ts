import apiClient from "../../../hooks/apiClient"
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
  const query: Record<string, unknown> = {
    page: params.page ?? 1,
    limit: params.limit ?? 9,
  }

  if (params.tag) query.tag = params.tag

  const res = await apiClient.get<ApiListResponse<BlogListItem>>(BASE, query)

  return {
    blogs: res.data,
    meta: res.meta,
  }
}