import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import configKeys from '../../config';

export const authService = () => {
    const hashPassword = async (password: string) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    };

    const comparePassword = (password: string, hashedPassword: string) => {
        return bcrypt.compare(password, hashedPassword);
    };

    const generateToken = (payload: JwtPayload) => {
        const token = jwt.sign({ payload }, configKeys.JWT_SECRET, {
            expiresIn: configKeys.JWT_SECRET_EXPIRTATION,
        });
        return token;
    };

    const generateRefreshToken = (payload: JwtPayload) => {
        const token = jwt.sign({ payload }, configKeys.JWT_REFRESH_SECRET, {
            expiresIn: '7d',
        });
        return token;
    };

    const verifyToken = (token: string) => {
        return jwt.verify(token, configKeys.JWT_SECRET);
    };

    const decodeToken = (token: string) => {
        const decodedToken: jwt.JwtPayload | null = jwt.decode(token) as jwt.JwtPayload | null;
        return decodedToken;
    };

    const decodedTokenAndReturnExpireDate = (token: string): number => {
        const decodedToken: any = jwt.decode(token);
        let exiprationTimeStamp: number;
        if (decodedToken && decodedToken.exp) {
            exiprationTimeStamp = decodedToken.exp * 1000;
        } else {
            exiprationTimeStamp = 0;
        }
        return exiprationTimeStamp;
    };
    return {
        comparePassword,
        generateToken,
        generateRefreshToken,
        hashPassword,
        verifyToken,
        decodedTokenAndReturnExpireDate,
        decodeToken,
    };
};

export type AuthService = typeof authService;

export type AuthServiceReturn = ReturnType<AuthService>;
