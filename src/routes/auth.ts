import express, { Router } from 'express';
import * as authController from '../controllers/auth-controller';
import validationMiddleware from '../middlewares/validation.middleware';
import { RegisterUserDto } from '../dto/auth.dto';

const router: Router = express.Router();

router.post('/register', validationMiddleware(RegisterUserDto, 'body'), authController.register);
router.post('/login', authController.login);

export default router;

