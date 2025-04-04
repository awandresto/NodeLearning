import { Token } from '../../entities/tokens.entity';

export const storeRefreshedToken = async (userId: number, token: string) => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);

    await Token.save({
        userId,
        token,
        expiryDate
    });
};

export const retrieveRefreshedToken = async (token: string): Promise<string | null> => {
    const refreshToken = await Token.findOne({ where: { token: token } });

    if (!refreshToken || refreshToken.expiryDate <= new Date()) return null;

    return refreshToken.token;
};

export const removeRefreshedToken = async (token: string) => {
    await Token.delete({ token });
};
