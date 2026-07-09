import apiClient from "../../../hooks/apiClient"
import type { ApiResponse, GetAllTeamMembersParams, ITeamMember } from "../types"



export type { ITeamMember, GetAllTeamMembersParams }

const BASE = '/team'

// GET /api/team-members
export const getAllTeamMembers = async (
  params: GetAllTeamMembersParams = {}
): Promise<ITeamMember[]> => {
  const query: Record<string, unknown> = {}

  // Public listing defaults to active members only, matching the
  // mock's default behavior — but stays overridable via params.
  query.status = params.status ?? 'active'

  const res = await apiClient.get<ApiResponse<ITeamMember[]>>(BASE, query)
  return res.data
}