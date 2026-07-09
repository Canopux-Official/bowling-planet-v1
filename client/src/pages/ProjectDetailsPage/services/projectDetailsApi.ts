import apiClient from "../../../hooks/apiClient";
import type { ApiResponse, IProject } from "../../ProjectsPage/types";

const BASE = `/project`

export const getProjectBySlug = async (slug: string): Promise<IProject> => {
  const res = await apiClient.get<ApiResponse<IProject>>(`${BASE}/${slug}`)
  return res.data
}
