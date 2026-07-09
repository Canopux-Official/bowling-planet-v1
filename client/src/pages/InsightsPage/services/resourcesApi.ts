
import { apiClient } from '../../../services/apiClient'
import type { ApiListResponse, IPaginationMeta, IResource, ResourceType } from '../types'

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

const BASE = '/resource'

// GET /api/resources
export const getPublishedResources = async (
  params: GetPublishedResourcesParams = {}
): Promise<GetPublishedResourcesResponse> => {
  // 1. Build out search parameters dynamically
  const searchParams = new URLSearchParams()
  searchParams.append('page', String(params.page ?? 1))
  searchParams.append('limit', String(params.limit ?? 12))

  if (params.category) searchParams.append('category', params.category)
  if (params.type) searchParams.append('type', params.type)

  const url = `${BASE}?${searchParams.toString()}`

  // 2. Call apiClient directly as a function
  const res = await apiClient(url, {
    method: 'GET',
    headers: { 'x-skip-auth-refresh': 'true' }
  }) as ApiListResponse<IResource>

  // 3. Map values back (Note: If your backend envelope has sibling naming, update res.meta to match)
  return {
    resources: res.data,
    meta: res.meta, 
  }
}