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
router.post('/', createJob);
router.get('/id/:id', getJobById);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);



export default router;