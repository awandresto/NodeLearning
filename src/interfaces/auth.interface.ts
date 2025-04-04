import { Request } from 'express';
import { User } from '../entities/users.entity';

export interface RequestWithUser extends Request {
    user: User;
    cookies: any;
    header(name: string): any;
}

export interface DataStoredInToken {
    id: number;
    role: string;
    email: string;
}
