import express from 'express'
import { createProject, deleteProject, getAllProjects, getProjectBySlug, togglePublishProject, updateProject } from '../controllers/project.controller';
const router = express.Router()


// admin
router.post('/', createProject);
router.patch('/:id', updateProject);
router.delete('/:id', deleteProject);
router.patch('/:id/publish', togglePublishProject);

// public
router.get('/', getAllProjects);
router.get('/:slug', getProjectBySlug);
 
export default router;