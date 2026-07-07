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

// Admin (add your auth/role middleware here as needed)
router.post('/', createJob);
router.get('/id/:id', getJobById);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

// Keep this LAST — it's a catch-all param route and would otherwise
// shadow more specific paths like /id/:id.
router.get('/:slug', getJobBySlug);

export default router;