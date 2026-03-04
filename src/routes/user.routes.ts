import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { isAdmin, isSelfOrAdmin } from '../middlewares/role.middleware.js';
import { tryCatch } from '../utils/error-handler.util.js';

const router = Router();

//все роуты под аутентификацией
router.use(authMiddleware);


router.get('/', isAdmin, tryCatch(userController.getAllUsers));
router.get('/:id', isSelfOrAdmin('id'), tryCatch(userController.getUserById));

router.patch('/:id/block', isSelfOrAdmin('id'), tryCatch(userController.blockUser));
router.patch('/:id/unblock', isAdmin, tryCatch(userController.unblockUser));

export default router;