import express from 'express';
import { getFranchisePage, updateFranchisePage } from '../controllers/franchisePage.controller';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getFranchisePage);
// Protect the PUT route with JWT
router.put('/', authenticateJWT, updateFranchisePage);

export default router;
