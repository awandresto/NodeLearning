import express, { Router } from 'express';
import * as userController from '../controllers/user-controller';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../middlewares/validation.middleware';
import { CreateUserDto } from '../dto/user.dto';

const router: Router = express.Router();

router.get('/', authMiddleware(), userController.getAllUsers);
router.post('/create', authMiddleware(), validationMiddleware(CreateUserDto, 'body'), userController.createUser);
router.put('/:id', authMiddleware(), userController.updateUser);

export default router;
