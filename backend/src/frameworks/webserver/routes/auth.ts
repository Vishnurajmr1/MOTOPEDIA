import authController from '../../../adapters/controllers/authController';
import { adminDbRepostiory } from '../../../application/repositories/adminDBRepository';
import { refreshTokenDbRepository } from '../../../application/repositories/refreshTokenDBRepository';
import { userDbRepository } from '../../../application/repositories/userDBRepository';
import { authServiceInterface } from '../../../application/services/authServicesInterface';
import { googleAuthServiceInterface } from '../../../application/services/googleAuthServicesInterface';
import { sendEmailServiceInterface } from '../../../application/services/sendEmailInterface';
import { userRepositoryMongoDB } from '../../../frameworks/database/mongodb/repositories/UserRepoMongoDb';
import { adminRepoMongodb } from '../../../frameworks/database/mongodb/repositories/adminRepoMongoDb';
import { refreshTokenRepositoryMongoDB } from '../../../frameworks/database/mongodb/repositories/refreshTokenRepoMongoDb';
import { authService } from '../../../frameworks/services/authService';
import { googleAuthService } from '../../../frameworks/services/googleAuthService';
import { sendEmailService } from '../../../frameworks/services/sendEmailService';
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
        googleAuthServiceInterface,
        googleAuthService,
    );

    //* User
    router.route('/signup').post(controller.registerUser);
    router.route('/verify-otp').post(controller.verifyUserEmail);
    router.route('/resent-otp').post(controller.resendOtpverify);
    router.route('/user-login').post(controller.loginUser);
    router.route('/user-logout').post(controller.logoutUser);
    router.route('/login-with-google').post(controller.loginWithGoogle);
    router.route('/forgot-password').post(controller.forgotPassword);
    router.route('/reset-password').post(controller.resetPasswordByEmail);
    router.route('/confirm-password').put(controller.confirmPassword);
    //*Admin
    router.route('/admin-login').post(controller.loginAdmin);
    return router;
};

export default authRouter;
