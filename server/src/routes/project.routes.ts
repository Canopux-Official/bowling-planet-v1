import express from 'express'
import { createProject, deleteProject, getAllProjects, getProjectBySlug, togglePublishProject, updateProject } from '../controllers/project.controller';
import { upload } from '../middleware/multer';
const router = express.Router()


// admin
router.post('/admin',upload.array('images', 5), createProject);
router.patch('/admin/:id', upload.array('images', 5),updateProject);
router.delete('/admin/:id', deleteProject);
router.patch('/admin/:id/publish', togglePublishProject);

// public
router.get('/', getAllProjects);
router.get('/:slug', getProjectBySlug);
 
export default router;