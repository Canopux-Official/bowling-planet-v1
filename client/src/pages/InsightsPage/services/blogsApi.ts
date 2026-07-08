import {
  mockBlogsListView,
  type BlogListItem,
  type IPaginationMeta,
} from './mockBlogs'

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

export async function getPublishedBlogs(
  params: GetPublishedBlogsParams = {},
): Promise<GetPublishedBlogsResponse> {
  // TODO: implement API call
  const page = params.page ?? 1
  const limit = params.limit ?? 4
  let blogs = [...mockBlogsListView]

  if (params.tag) {
    blogs = blogs.filter((b) => b.tags.includes(params.tag!))
  }

  blogs.sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''))

  const total = blogs.length
  const totalPages = Math.max(1, Math.ceil(total / limit) || 1)
  const start = (page - 1) * limit

  return Promise.resolve({
    blogs: blogs.slice(start, start + limit),
    meta: { page, limit, total, totalPages },
  })
}
