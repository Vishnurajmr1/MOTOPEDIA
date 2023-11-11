import authController from '@src/adapters/controllers/authController';
import { adminDbRepostiory } from '@src/application/repositories/adminDBRepository';
import { refreshTokenDbRepository } from '@src/application/repositories/refreshTokenDBRepository';
import { userDbRepository } from '@src/application/repositories/userDBRepository';
import { authServiceInterface } from '@src/application/services/authServicesInterface';
import { sendEmailServiceInterface } from '@src/application/services/sendEmailInterface';
import { userRepositoryMongoDB } from '@src/frameworks/database/mongodb/repositories/UserRepoMongoDb';
import { adminRepoMongodb } from '@src/frameworks/database/mongodb/repositories/adminRepoMongoDb';
import { refreshTokenRepositoryMongoDB } from '@src/frameworks/database/mongodb/repositories/refreshTokenRepoMongoDb';
import { authService } from '@src/frameworks/services/authService';
import { sendEmailService } from '@src/frameworks/services/sendEmailService';
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
        sendEmailServiceInterface,
        sendEmailService,
    );

    //* User
    router.post('/signup', controller.registerUser);
    router.post('/verify-otp', controller.verifyUserEmail);
    router.post('/resent-otp', controller.resendOtpverify);
    router.post('/user-login', controller.loginUser);
    router.post('/user-logout', controller.logoutUser);
    router.post('forgot-password');
    //*Admin
    router.post('/admin-login', controller.loginAdmin);
    return router;
};

export default authRouter;
