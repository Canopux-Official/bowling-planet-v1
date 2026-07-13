import express from 'express'
import { createTeamMember, deleteTeamMember, getAllTeamMembers, updateTeamMember } from '../controllers/team.controller';
import { apiSecretMiddleware } from '../middleware/apiSecretMiddleware';
import { authenticateJWT } from '../middleware/authMiddleware';
import { upload } from '../middleware/multer';
const router = express.Router()


const teamUpload = upload.fields([{ name: 'image', maxCount: 1 }]);


// admin
router.post('/admin',authenticateJWT,teamUpload, createTeamMember);
router.patch('/admin/:id', authenticateJWT, teamUpload, updateTeamMember);
router.delete('/admin/:id', authenticateJWT, deleteTeamMember);


// public
router.get('/', getAllTeamMembers);

export default router;
