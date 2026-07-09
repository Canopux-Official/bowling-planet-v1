/**
 * Shared project types — mirrors backend Mongoose schema exactly.
 * // Assumption: types colocated with list API to avoid an extra types folder.
 */

import apiClient from "../../../hooks/apiClient";
import type { ApiResponse, GetAllProjectsParams, GetAllProjectsResponse } from "../types";

const BASE = `/project`

export const getAllProjects = async (
  params: GetAllProjectsParams = {}
): Promise<GetAllProjectsResponse> => {
  const query: Record<string, unknown> = {
    page: params.page ?? 1,
    limit: params.limit ?? 9,
  }

  if (params.tags?.length) query.tags = params.tags.join(',')
  if (params.isPublished !== undefined) query.isPublished = params.isPublished
  if (params.search) query.search = params.search
  if (params.sort) query.sort = params.sort

  const res = await apiClient.get<ApiResponse<GetAllProjectsResponse>>(BASE, query)
  return res.data
}