import express from 'express';
import { getFranchisePage, updateFranchisePage } from '../controllers/franchisePage.controller';
import { authenticateJWT } from '../middleware/authMiddleware';

import { upload } from '../middleware/multer';

const router = express.Router();

router.get('/', getFranchisePage);
// Protect the PUT route with JWT
router.put('/', authenticateJWT, upload.any(), updateFranchisePage);

export default router;
