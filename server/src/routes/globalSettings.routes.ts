import express from 'express';
import { getGlobalSettings, updateGlobalSettings } from '../controllers/globalSettings.controller';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = express.Router();

// Public route to fetch settings (needed by all visitors on Landing page)
router.get('/', getGlobalSettings);

// Protected route to update settings (only Admin)
router.put('/', authenticateJWT, updateGlobalSettings);

export default router;
