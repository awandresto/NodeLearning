import express, { Router } from 'express';
import * as userController from '../controllers/user-controller';
import authMiddleware from '../middlewares/auth.middleware';

const router: Router = express.Router();

router.get('/', authMiddleware(), userController.getAllUsers);
router.post('/create', authMiddleware(), userController.createUser);
router.put('/:id', authMiddleware(), userController.updateUser);

export default router;