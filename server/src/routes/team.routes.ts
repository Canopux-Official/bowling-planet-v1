import express from 'express'
import { createTeamMember, deleteTeamMember, getAllTeamMembers, updateTeamMember } from '../controllers/team.controller';
import { apiSecretMiddleware } from '../middleware/apiSecretMiddleware';
import { authenticateJWT } from '../middleware/authMiddleware';
const router = express.Router()


// admin
router.post('/admin',authenticateJWT, createTeamMember);
router.patch('/admin/:id', authenticateJWT, updateTeamMember);
router.delete('/admin/:id', authenticateJWT, deleteTeamMember);


// public
router.get('/', getAllTeamMembers);

export default router;