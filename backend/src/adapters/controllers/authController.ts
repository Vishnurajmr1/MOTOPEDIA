import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { AuthService } from '@src/frameworks/services/authService';
import { AuthServiceInterface } from '@src/application/services/authServicesInterface';
import { AdminDbInterface } from '@src/application/repositories/adminDBRepository';
import { usersDbInterface } from '@src/application/repositories/userDBRepository';
import { userLogin, userRegister } from '@src/application/use-cases/auth/userAuth';
import { UserRepositoryMongoDB } from '@src/frameworks/database/mongodb/repositories/UserRepoMongoDb';
import { AdminRepositoryMongoDb } from '@src/frameworks/database/mongodb/repositories/adminRepoMongoDb';
import { RefreshTokenDbInterface } from '@src/application/repositories/refreshTokenDBRepository';
import { RefreshTokenRepositoryMongoDB } from '@src/frameworks/database/mongodb/repositories/refreshTokenRepoMongoDb';
import { UserRegisterInterface } from '@src/types/userRegisterInterface';
import { adminLogin } from '@src/application/use-cases/auth/adminAuth';
const authController = (
    authServiceInterface: AuthServiceInterface,
    authServiceImplementation: AuthService,
    userDbRepository: usersDbInterface,
    userDbRepositoryImplementation: UserRepositoryMongoDB,
    adminDbRepository: AdminDbInterface,
    adminDbRepositoryImplementation: AdminRepositoryMongoDb,
    refreshTokenDbRepository: RefreshTokenDbInterface,
    refreshTokenDbRepositoryImplementation: RefreshTokenRepositoryMongoDB,
) => {
    const dbRepositoryUser = userDbRepository(userDbRepositoryImplementation());
    const dbRepositoryAdmin = adminDbRepository(adminDbRepositoryImplementation());
    const dbRepositoryRefreshToken = refreshTokenDbRepository(refreshTokenDbRepositoryImplementation());
    const authService = authServiceInterface(authServiceImplementation());

    const registerUser = asyncHandler(async (req: Request, res: Response) => {
        const user: UserRegisterInterface = req.body;
        const { accessToken, refreshToken } = await userRegister(
            user,
            dbRepositoryUser,
            dbRepositoryRefreshToken,
            authService,
        );
        res.status(200).json({
            status: 'success',
            message: 'Successfully registerd the user',
            accessToken,
            refreshToken,
        });
    });

    const loginUser = asyncHandler(async (req: Request, res: Response) => {
        const { email, password }: { email: string; password: string } = req.body;
        const { accessToken, refreshToken } = await userLogin(
            email,
            password,
            dbRepositoryUser,
            dbRepositoryRefreshToken,
            authService,
        );
        res.status(200).json({
            status: 'success',
            message: 'User logged in successfully',
            accessToken,
            refreshToken,
        });
    });
    const loginAdmin = asyncHandler(async (req: Request, res: Response) => {
        const { email, password }: { email: string; password: string } = req.body;
        const { accessToken, refreshToken } = await adminLogin(
            email,
            password,
            dbRepositoryAdmin,
            dbRepositoryRefreshToken,
            authService,
        );
        res.status(200).json({
            status: 'success',
            message: 'Successfully logged in',
            accessToken,
            refreshToken,
        });
    });
    return {
        registerUser,
        loginAdmin,
        loginUser
    };
};

export default authController;
