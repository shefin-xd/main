import { Router } from 'express';
import { login, me, signup } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
const router = Router();
router.post('/signup', asyncHandler(signup));
router.post('/login', asyncHandler(login));
router.get('/me', authenticate, me);
export default router;
