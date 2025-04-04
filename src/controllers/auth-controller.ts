import { Request, Response } from 'express';
import * as authService from '../services/auth-service';
import { storeRefreshedToken } from '../utils/token/token-management';
import { ErrorMessage } from '../utils/constants/constants';

export const register = async (req: Request, res: Response) => {
    try {
        const registerUserDto: any = req.body as any;
        const newUser = await authService.registerUser(registerUserDto);

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        console.log(err);
        res.status(500).json(ErrorMessage.errorRegisteringUser);
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await authService.loginUser(email, password);

    if (user) {
        const accessToken = authService.generateAccessToken({ id: user.id, email: user.email });
        const refreshToken = authService.generateRefreshToken({ id: user.id, email: user.email });

        await storeRefreshedToken(user.id, refreshToken);
        res.json({ accessToken, refreshToken });
    } else {
        res.status(400).send(ErrorMessage.errorInvalidCredentials);
    }
};
