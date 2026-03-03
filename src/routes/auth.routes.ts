import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { tryCatch } from '../utils/error-handler.util.js';

const router = Router();

router.post('/register', tryCatch(authController.register));
router.post('/login', tryCatch(authController.login));

export default router;