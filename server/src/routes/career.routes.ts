import { Router } from 'express';
import {
  createJob,
  getAllJobs,
  getJobBySlug,
  getJobById,
  updateJob,
  deleteJob,
} from '../controllers/career.controller';

const router = Router();

// Public
router.get('/', getAllJobs);
router.get('/:slug', getJobBySlug);

// Admin 
router.post('/admin', createJob);
router.get('/admin/id/:id', getJobById);
router.put('/admin/:id', updateJob);
router.delete('/admin/:id', deleteJob);



export default router;