import { Router } from 'express';
import {
  createLead,
  savePartialLead,
  logLeadEvent,
  getLeads,
  getLeadById,
  updateLeadStatus,
  deleteLead
} from '../controllers/lead.controller';
import { authenticateJWT } from '../middleware/authMiddleware'; // Admin protection

const router = Router();

// Public routes (for the frontend widget)
router.post('/', createLead);
router.post('/partial', savePartialLead);
router.post('/event', logLeadEvent);

// Protected routes (for Admin CRM)
router.use(authenticateJWT); // All routes below this require authentication
router.route('/')
  .get(getLeads);

router.route('/:id')
  .get(getLeadById)
  .delete(deleteLead);

router.patch('/:id/status', updateLeadStatus);

export default router;
