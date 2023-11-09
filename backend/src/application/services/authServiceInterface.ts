import { AuthServiceReturn } from '@src/frameworks/services/authService';
import { JwtPayload } from '@src/types/common';

export const authServiceInterface = (service: AuthServiceReturn) => {
    const hashPassword = (password: string) => service.hashPassword(password);

    const comparePassword = (password: string, hashedPassword: string) => {
        service.comparePassword(password, hashedPassword);
    };
    const verifyPassword = (token: string) => {
        service.verifyToken(token);
    };
    const generateToken = (payload: JwtPayload) => {
        service.generateToken(payload);
    };
    const generateRefreshToken = (payload: JwtPayload) => {
        service.generateRefreshToken(payload);
    };

    const decondedTokenAndReturnExpireDate = (token: string) => {
        service.decondedTokenAndReturnExpireDate(token);
    };

    const decodedToken = (token: string) => {
        service.decodeToken(token);
    };
    return {
        hashPassword,
        comparePassword,
        verifyPassword,
        generateToken,
        generateRefreshToken,
        decondedTokenAndReturnExpireDate,
        decodedToken,
    };
};
export type AuthServiceInterface = typeof authServiceInterface;
