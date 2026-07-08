import express from 'express'
import { createTeamMember, deleteTeamMember, getAllTeamMembers, updateTeamMember } from '../controllers/team.controller';
const router = express.Router()


// admin
router.post('/admin', createTeamMember);
router.patch('/admin/:id', updateTeamMember);
router.delete('/admin/:id', deleteTeamMember);


// public
router.get('/', getAllTeamMembers);

export default router;