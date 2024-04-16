import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { RefreshTokenDbInterface } from '../../application/repositories/refreshTokenDBRepository';
import { AuthServiceInterface } from '../../application/services/authServicesInterface';
import { RefreshTokenRepositoryMongoDB } from '../../frameworks/database/mongodb/repositories/refreshTokenRepoMongoDb';
import { AuthService } from '../../frameworks/services/authService';
import { refreshTokenUseCase } from '../../application/use-cases/auth/refreshToken';

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
