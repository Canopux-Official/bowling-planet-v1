/**
 * Shared project types — mirrors backend Mongoose schema exactly.
 * // Assumption: types colocated with list API to avoid an extra types folder.
 */


import { apiClient } from "../../../services/apiClient";
import type { ApiResponse, GetAllProjectsParams, GetAllProjectsResponse } from "../types";

const BASE = `/project`

export const getAllProjects = async (
  params: GetAllProjectsParams = {}
): Promise<GetAllProjectsResponse> => {
  // 1. Construct URL search parameters
  const searchParams = new URLSearchParams()
  searchParams.append('page', String(params.page ?? 1))
  searchParams.append('limit', String(params.limit ?? 9))

  if (params.tags?.length) {
    searchParams.append('tags', params.tags.join(','))
  }
  
  if (params.isPublished !== undefined) {
    searchParams.append('isPublished', String(params.isPublished))
  }
  
  if (params.search) {
    searchParams.append('search', params.search)
  }
  
  if (params.sort) {
    searchParams.append('sort', params.sort)
  }

  const url = `${BASE}?${searchParams.toString()}`

  // 2. Call apiClient directly with the required config and skip-refresh flag
  const res = await apiClient(url, {
    method: 'GET',
    headers: { 'x-skip-auth-refresh': 'true' }
  }) as ApiResponse<GetAllProjectsResponse>

  return res.data
}
