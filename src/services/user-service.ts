import bcrypt from 'bcrypt';
import { User } from '../entities/users.entity'

export const getAllUsers = async () => {
    const [users, count] = await User.findAndCount({});

    return { users, count };
};

export const updateUser = async (id: number, registerUserData: any) => {
    const user: User = await User.findOne({ where: { id } });
    if (!user) return null;

    if (registerUserData.name) {
        user.name = registerUserData.name;
    }
    if (registerUserData.email) {
        user.email = registerUserData.email;
    }
    if (registerUserData.password) {
        user.password = await bcrypt.hash(registerUserData.password, 10);
    }

    return await User.save(user);
};