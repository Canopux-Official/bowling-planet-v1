import apiClient from "../../../hooks/apiClient"
import type { IJob } from "../../JobsPage/types"
import type { ApiResponse } from "../../ProjectsPage/types"

const BASE = '/career'

export const getJobBySlug = async (slug: string): Promise<IJob> => {
  const res = await apiClient.get<ApiResponse<IJob>>(`${BASE}/${slug}`)
  return res.data
}
