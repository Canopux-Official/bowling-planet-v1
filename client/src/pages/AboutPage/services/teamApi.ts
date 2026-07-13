
import { apiClient } from "../../../services/apiClient"
import type { ApiResponse, GetAllTeamMembersParams, ITeamMember } from "../types"

export type { ITeamMember, GetAllTeamMembersParams }

const BASE = '/team'

export const getAllTeamMembers = async (
  params: GetAllTeamMembersParams = {}
): Promise<ITeamMember[]> => {
  const status = params.status ?? 'active'
  
  // Construct a standard query string
  const url = `${BASE}?status=${encodeURIComponent(status)}`

  // Call apiClient directly as a function instead of .get()
  const res = await apiClient(url, { method: 'GET',headers: {'x-skip-auth-refresh': 'true'} }) as ApiResponse<ITeamMember[]>
  
  return res.data
}
