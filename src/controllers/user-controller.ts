import { Request, Response } from 'express';
import * as authService from '../services/auth-service';
import * as userService from '../services/user-service';
import { ErrorMessage } from '../utils/constants/constants';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const { users, count } = await userService.getAllUsers();

        res.status(200).json({ users, count });
    } catch (err) {
        res.status(err.response?.status || 500).json({ error: err.message });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const createUserDto: any = req.body as any;
        const newUser = await userService.createUser(createUserDto);

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        console.log(err);
        res.status(500).json(ErrorMessage.errorCreatingUser);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateUserDto: any = req.body as any;

        const updateUser = await userService.updateUser(id, updateUserDto);

        res.status(201).json({ message: 'User updated successfully', user: updateUser });
    } catch (err) {
        console.log(err);
        res.status(500).json(ErrorMessage.errorUpdatingUser);
    }
};
