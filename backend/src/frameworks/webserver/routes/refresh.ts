import refreshTokenController from '@src/adapters/controllers/refreshTokenController';
import { refreshTokenDbRepository } from '@src/application/repositories/refreshTokenDBRepository';
import { authServiceInterface } from '@src/application/services/authServicesInterface';
import { refreshTokenRepositoryMongoDB } from '@src/frameworks/database/mongodb/repositories/refreshTokenRepoMongoDb';
import { authService } from '@src/frameworks/services/authService';
import express from 'express';
const refreshRouter=()=>{
    const router=express.Router();
    const controller=refreshTokenController(
        authServiceInterface,
        authService,
        refreshTokenDbRepository,
        refreshTokenRepositoryMongoDB
    );
    router.post('/refresh',controller.refreshToken)
    return router
}

export default refreshRouter;