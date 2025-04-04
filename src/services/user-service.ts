import bcrypt from 'bcrypt';
import { User } from '../entities/users.entity';
import { CreateUserDto } from 'src/dto/user.dto';

export const getAllUsers = async () => {
    const [users, count] = await User.findAndCount({});

    return { users, count };
};

export const createUser = async (createUserData: CreateUserDto) => {
    const { name, email, password } = createUserData;
    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.save({
        name,
        email,
        password: hashedPassword
    });
};

export const updateUser = async (id: number, updateUserData: any) => {
    const user: User = await User.findOne({ where: { id } });
    if (!user) return null;

    const { name, email, password } = updateUserData;

    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    user.password = password ? await bcrypt.hash(password, 10) : user.password;

    return await User.save(user);
};
