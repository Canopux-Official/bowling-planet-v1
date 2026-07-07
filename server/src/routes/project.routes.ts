import express from 'express'
import { createProject, deleteProject, getAllProjects, getProjectBySlug, togglePublishProject, updateProject } from '../controllers/project.controller';
const router = express.Router()


// CREATE
router.post('/', createProject);
 
// READ — list (pagination, filtering, search via query params)
router.get('/', getAllProjects);
 
// READ — single (by slug)
router.get('/:slug', getProjectBySlug);
 
// UPDATE
router.patch('/:id', updateProject);
 
// DELETE (soft delete)
router.delete('/:id', deleteProject);
 
// PUBLISH / UNPUBLISH toggle
router.patch('/:id/publish', togglePublishProject);
 
export default router;