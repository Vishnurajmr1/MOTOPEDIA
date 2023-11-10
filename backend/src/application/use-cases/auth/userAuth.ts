import { RefreshTokenDbInterface } from '@src/application/repositories/refreshTokenDBRepository';
import { usersDbInterface } from '@src/application/repositories/userDBRepository';
import { AuthServiceInterface } from '@src/application/services/authServicesInterface';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { JwtPayload } from '@src/types/common';
import { UserInterface } from '@src/types/userInterface';
import { UserRegisterInterface } from '@src/types/userRegisterInterface';
import AppError from '@src/utils/appError';

export const userRegister = async (
    user: UserRegisterInterface,
    userRepository: ReturnType<usersDbInterface>,
    refreshTokenRepository: ReturnType<RefreshTokenDbInterface>,
    authService: ReturnType<AuthServiceInterface>,
) => {
    user.email = user?.email?.toLowerCase();

    const isEmailAlreadyRegistered = await userRepository.getUserByEmail(user.email);

    if (isEmailAlreadyRegistered) {
        throw new AppError('User with same email already exists...!', HttpStatusCodes.CONFLICT);
    }
    if (user.password) {
        user.password = await authService.hashPassword(user.password);
    }
    const { _id: userId, email } = await userRepository.addUser(user);
    const payload = {
        Id: userId,
        email,
        role: 'user',
    };
    const accessToken = authService.generateToken(payload);
    const refreshToken = authService.generateRefreshToken(payload);
    const expiratonDate = authService.decodedTokenAndReturnExpireDate(refreshToken);
    await refreshTokenRepository.saveRefreshToken(userId, refreshToken, expiratonDate);
    return { accessToken, refreshToken };
};

export const userLogin = async (
    email: string,
    password: string,
    userRepository: ReturnType<usersDbInterface>,
    refreshTokenRepository: ReturnType<RefreshTokenDbInterface>,
    authService: ReturnType<AuthServiceInterface>,
) => {
    const user: UserInterface | null = await userRepository.getUserByEmail(email);

    if (!user) {
        throw new AppError("this user doesn't exist", HttpStatusCodes.NOT_FOUND);
    }
    const isPasswordCorrect = await authService.comparePassword(password, user.password);

    if (!isPasswordCorrect) {
        throw new AppError('Sorry,your password is incorrect.Please try again', HttpStatusCodes.UNAUTHORIZED);
    }

    const payload: JwtPayload = {
        Id: user._id,
        email: user.email,
        role: 'user',
    };
    await refreshTokenRepository.deleteRefreshToken(user._id);
    const accessToken = authService.generateToken(payload);
    const refreshToken = authService.generateRefreshToken(payload);
    const expiratonDate = authService.decodedTokenAndReturnExpireDate(refreshToken);
    await refreshTokenRepository.saveRefreshToken(user._id, refreshToken, expiratonDate);
    return { accessToken, refreshToken };
};
