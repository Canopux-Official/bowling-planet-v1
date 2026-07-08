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

const router = Router();

// public
router.get('/', getPublishedResources);     
router.get('/:slug', getResourceBySlug);       

// admin
router.post('/admin', createResource);                        
router.put('/admin/:id', updateResource);                        
router.delete('/admin/:id', deleteResource);                    
router.get('/admin/all', getAllResourcesAdmin);                   
router.patch('/admin/:id/toggle-publish', togglePublishResource); 

export default router;