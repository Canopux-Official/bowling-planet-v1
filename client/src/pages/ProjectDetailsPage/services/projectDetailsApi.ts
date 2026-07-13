
import { apiClient } from "../../../services/apiClient";
import type { ApiResponse, IProject } from "../../ProjectsPage/types";

const BASE = `/project`

export const getProjectBySlug = async (slug: string): Promise<IProject> => {
  const url = `${BASE}/${slug}`

  // Call apiClient directly as a function with GET method and skip refresh header
  const res = await apiClient(url, {
    method: 'GET',
    headers: { 'x-skip-auth-refresh': 'true' }
  }) as ApiResponse<IProject>

  return res.data
}
