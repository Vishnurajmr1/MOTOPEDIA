import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { RefreshTokenDbInterface } from '@src/application/repositories/refreshTokenDBRepository';
import { AuthServiceInterface } from '@src/application/services/authServicesInterface';
import { RefreshTokenRepositoryMongoDB } from '@src/frameworks/database/mongodb/repositories/refreshTokenRepoMongoDb';
import { AuthService } from '@src/frameworks/services/authService';
import { refreshTokenUseCase } from '@src/application/use-cases/auth/refreshToken';

const refreshTokenController = (
    authServiceInterface: AuthServiceInterface,
    authServiceImplementation: AuthService,
    refreshTokenDbRepository: RefreshTokenDbInterface,
    refreshTokenRepositoryImplementation: RefreshTokenRepositoryMongoDB,
) => {
    const dbRepositoryRefreshToken = refreshTokenDbRepository(refreshTokenRepositoryImplementation());
    const authService = authServiceInterface(authServiceImplementation());

    const refreshToken = asyncHandler(async (req: Request, res: Response) => {
        let refreshToken = req.body.refreshToken;
        const response = await refreshTokenUseCase(refreshToken, dbRepositoryRefreshToken, authService);
        res.status(200).json({
            status: 'success',
            message: 'Successfully refreshed token',
            accessToken: response,
        });
    });
    return {
        refreshToken,
    };
};

export default refreshTokenController;
