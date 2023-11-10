import authController from '@src/adapters/controllers/authController';
import { adminDbRepostiory } from '@src/application/repositories/adminDBRepository';
import { refreshTokenDbRepository } from '@src/application/repositories/refreshTokenDBRepository';
import { userDbRepository } from '@src/application/repositories/userDBRepository';
import { authServiceInterface } from '@src/application/services/authServicesInterface';
import { userRepositoryMongoDB } from '@src/frameworks/database/mongodb/repositories/UserRepoMongoDb';
import { adminRepoMongodb } from '@src/frameworks/database/mongodb/repositories/adminRepoMongoDb';
import { refreshTokenRepositoryMongoDB } from '@src/frameworks/database/mongodb/repositories/refreshTokenRepoMongoDb';
import { authService } from '@src/frameworks/services/authService';
import express from 'express';

const authRouter = () => {
    const router = express.Router();
    const controller = authController(
        authServiceInterface,
        authService,
        userDbRepository,
        userRepositoryMongoDB,
        adminDbRepostiory,
        adminRepoMongodb,
        refreshTokenDbRepository,
        refreshTokenRepositoryMongoDB,
    );

    //* User
    router.post('/user-register',controller.registerUser);
    router.post('/user-login',controller.loginUser)
    //*Admin
    router.post('/admin-login',controller.loginAdmin);
    return router;
};

export default authRouter;
