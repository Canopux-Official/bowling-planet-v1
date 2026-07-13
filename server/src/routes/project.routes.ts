import express from 'express'
import { createProject, deleteProject, getAllProjects, getProjectBySlug, togglePublishProject, updateProject } from '../controllers/project.controller';
import { upload } from '../middleware/multer';
import { authenticateJWT } from '../middleware/authMiddleware';
const router = express.Router()


// admin
router.post('/admin',authenticateJWT,upload.any(), createProject);
router.patch('/admin/:id', authenticateJWT, upload.any(),updateProject);
router.delete('/admin/:id', authenticateJWT, deleteProject);
router.patch('/admin/:id/publish', authenticateJWT, togglePublishProject);

// public
router.get('/', getAllProjects);
router.get('/:slug', getProjectBySlug);
 
export default router;
