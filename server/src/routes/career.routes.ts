import { Router } from 'express';
import {
  createJob,
  getAllJobs,
  getJobBySlug,
  getJobById,
  updateJob,
  deleteJob,
} from '../controllers/career.controller';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

// Public
router.get('/', getAllJobs);
router.get('/:slug', getJobBySlug);

// Admin 
router.post('/admin',authenticateJWT, createJob);
router.get('/admin/id/:id',authenticateJWT, getJobById);
router.put('/admin/:id', authenticateJWT, updateJob);
router.delete('/admin/:id', authenticateJWT, deleteJob);



export default router;