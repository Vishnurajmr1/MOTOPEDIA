import refreshTokenController from '../../../adapters/controllers/refreshTokenController';
import { refreshTokenDbRepository } from '../../../application/repositories/refreshTokenDBRepository';
import { authServiceInterface } from '../../../application/services/authServicesInterface';
import { refreshTokenRepositoryMongoDB } from '../../../frameworks/database/mongodb/repositories/refreshTokenRepoMongoDb';
import { authService } from '../../../frameworks/services/authService';
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