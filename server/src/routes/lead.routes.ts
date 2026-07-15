import { Router } from 'express';
import {
  createLead,
  savePartialLead,
  logLeadEvent,
  getLeads,
  getLeadById,
  updateLeadStatus,
  deleteLead,
  getLeadAnalytics
} from '../controllers/lead.controller';
import { leadLimiter } from '../middleware/rateLimiter';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

// Public routes — rate limited to prevent DoS on Vercel free tier
router.post('/', leadLimiter, createLead);
router.post('/partial', leadLimiter, savePartialLead);
router.post('/event', leadLimiter, logLeadEvent);

// Protected routes (for Admin CRM)
router.use(authenticateJWT); // All routes below this require authentication
router.route('/')
  .get(getLeads);

router.get('/analytics', getLeadAnalytics);

router.route('/:id')
  .get(getLeadById)
  .delete(deleteLead);

router.patch('/:id/status', updateLeadStatus);

export default router;
