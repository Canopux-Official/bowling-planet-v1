import {
  mockResources,
  type IResource,
  type ResourceType,
} from './mockResources'
import type { IPaginationMeta } from './mockBlogs'

export type { IResource, ResourceType, IPaginationMeta }

export interface GetPublishedResourcesParams {
  page?: number
  limit?: number
  category?: string
  type?: ResourceType
}

export interface GetPublishedResourcesResponse {
  resources: IResource[]
  meta: IPaginationMeta
}

export async function getPublishedResources(
  params: GetPublishedResourcesParams = {},
): Promise<GetPublishedResourcesResponse> {
  // TODO: implement API call
  const page = params.page ?? 1
  const limit = params.limit ?? 4
  let resources = [...mockResources]

  if (params.category) {
    resources = resources.filter((r) => r.category === params.category)
  }
  if (params.type) {
    resources = resources.filter((r) => r.type === params.type)
  }

  resources.sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  const total = resources.length
  const totalPages = Math.max(1, Math.ceil(total / limit) || 1)
  const start = (page - 1) * limit

  return Promise.resolve({
    resources: resources.slice(start, start + limit),
    meta: { page, limit, total, totalPages },
  })
}
