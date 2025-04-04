import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../entities/users.entity';
import { removeRefreshedToken } from '../utils/token/token-management';

interface UserPayLoad {
    id: number;
    email: string;
}

export const registerUser = async (registerUserData: any) => {
    const { name, email, password } = registerUserData;
    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.save({
        name,
        email,
        password: hashedPassword
    });
};

export const loginUser = async (email: string, password: string) => {
    const user: User = await User.findOne({ where: { email }, select: ['id', 'email', 'password'] });
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? user : null;
};

export const generateAccessToken = (user: UserPayLoad) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '1d' });
};

export const generateRefreshToken = (user: UserPayLoad) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.REFRESH_TOKEN_SECRET! );
};

export const logoutUser = async (token: string) => {
    await removeRefreshedToken(token);
};
