import { Router } from 'express';
import { getHomePageData, updateHomePageData } from '../controllers/homePage.controller';
import { authenticateJWT } from '../middleware/authMiddleware';

import { upload } from '../middleware/multer';

const router = Router();

// Public route to fetch home page data
router.get('/', getHomePageData);

// Protected route to update home page data
// Uses authenticateJWT (ensure only admins can modify)
router.put('/', authenticateJWT, upload.any(), updateHomePageData);

export default router;
