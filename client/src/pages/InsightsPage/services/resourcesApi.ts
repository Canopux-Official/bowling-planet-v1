
import apiClient from '../../../hooks/apiClient'
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
  const query: Record<string, unknown> = {
    page: params.page ?? 1,
    limit: params.limit ?? 12,
  }

  if (params.category) query.category = params.category
  if (params.type) query.type = params.type

  const res = await apiClient.get<ApiListResponse<IResource>>(BASE, query)

  return {
    resources: res.data,
    meta: res.meta,
  }
}