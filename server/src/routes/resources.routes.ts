import { Router } from 'express';
import {
  createResource,
  updateResource,
  deleteResource,
  getAllResourcesAdmin,
  togglePublishResource,
  getPublishedResources,
  getResourceBySlug,
} from '../controllers/resource.controller';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

// public
router.get('/', getPublishedResources);     
router.get('/:slug', getResourceBySlug);       

// admin
router.post('/admin',authenticateJWT, createResource);                        
router.put('/admin/:id', authenticateJWT, updateResource);                        
router.delete('/admin/:id', authenticateJWT, deleteResource);                    
router.get('/admin/all', authenticateJWT, getAllResourcesAdmin);                   
router.patch('/admin/:id/toggle-publish', authenticateJWT, togglePublishResource); 

export default router;
