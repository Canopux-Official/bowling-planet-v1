import express from 'express'
import { createTeamMember, deleteTeamMember, getAllTeamMembers, updateTeamMember } from '../controllers/team.controller';
const router = express.Router()


// CREATE
router.post('/', createTeamMember);
 
// READ — list (pagination, filtering, search via query params)
router.get('/', getAllTeamMembers);
 
// UPDATE
router.patch('/:id', updateTeamMember);
 
// DELETE (soft delete)
router.delete('/:id', deleteTeamMember);
 
export default router;