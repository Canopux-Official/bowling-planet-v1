
import { apiClient } from "../../../services/apiClient"
import type { IJob } from "../../JobsPage/types"
import type { ApiResponse } from "../../ProjectsPage/types"

const BASE = '/career'

export const getJobBySlug = async (slug: string): Promise<IJob> => {
  const url = `${BASE}/${slug}`

  // Call apiClient directly as a function with GET method and skip refresh header
  const res = await apiClient(url, {
    method: 'GET',
    headers: { 'x-skip-auth-refresh': 'true' }
  }) as ApiResponse<IJob>

  return res.data
}