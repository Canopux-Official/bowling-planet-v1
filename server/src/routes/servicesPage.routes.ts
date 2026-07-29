import { Router } from 'express';
import { getServicesPageData, updateServicesPageData } from '../controllers/servicesPage.controller';
import { authenticateJWT } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/roleMiddleware';
import multer from 'multer';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Public route to get the services page data
router.get('/', getServicesPageData);

// Protected route to update the services page data (Admin or SuperAdmin)
router.put('/', authenticateJWT, requireRole(['Admin', 'SuperAdmin']), upload.any(), updateServicesPageData);

export default router;
