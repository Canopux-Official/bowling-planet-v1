import { Router } from 'express';
import {
  getServiceDetails,
  getServiceDetailBySlug,
  createServiceDetail,
  updateServiceDetail,
  deleteServiceDetail,
} from '../controllers/serviceDetail.controller';
import { authenticateJWT } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/roleMiddleware';

const router = Router();

// Public routes
router.get('/', getServiceDetails);
router.get('/:slug', getServiceDetailBySlug);

// Admin routes (require Admin or SuperAdmin role)
router.use(authenticateJWT);
router.use(requireRole(['Admin', 'SuperAdmin']));

router.post('/', createServiceDetail);
router.put('/:id', updateServiceDetail);
router.delete('/:id', deleteServiceDetail);

export default router;
