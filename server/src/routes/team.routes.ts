import express from 'express'
import { createTeamMember, deleteTeamMember, getAllTeamMembers, updateTeamMember } from '../controllers/team.controller';
const router = express.Router()


// admin
router.post('/', createTeamMember);
router.patch('/:id', updateTeamMember);
router.delete('/:id', deleteTeamMember);


// public
router.get('/', getAllTeamMembers);

export default router;