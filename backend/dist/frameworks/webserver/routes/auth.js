"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = __importDefault(require("../../../adapters/controllers/authController"));
const adminDBRepository_1 = require("../../../application/repositories/adminDBRepository");
const refreshTokenDBRepository_1 = require("../../../application/repositories/refreshTokenDBRepository");
const userDBRepository_1 = require("../../../application/repositories/userDBRepository");
const authServicesInterface_1 = require("../../../application/services/authServicesInterface");
const googleAuthServicesInterface_1 = require("../../../application/services/googleAuthServicesInterface");
const sendEmailInterface_1 = require("../../../application/services/sendEmailInterface");
const UserRepoMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/UserRepoMongoDb");
const adminRepoMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/adminRepoMongoDb");
const refreshTokenRepoMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/refreshTokenRepoMongoDb");
const authService_1 = require("../../../frameworks/services/authService");
const googleAuthService_1 = require("../../../frameworks/services/googleAuthService");
const sendEmailService_1 = require("../../../frameworks/services/sendEmailService");
const express_1 = __importDefault(require("express"));
const authRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, authController_1.default)(authServicesInterface_1.authServiceInterface, authService_1.authService, userDBRepository_1.userDbRepository, UserRepoMongoDb_1.userRepositoryMongoDB, adminDBRepository_1.adminDbRepostiory, adminRepoMongoDb_1.adminRepoMongodb, refreshTokenDBRepository_1.refreshTokenDbRepository, refreshTokenRepoMongoDb_1.refreshTokenRepositoryMongoDB, sendEmailInterface_1.sendEmailServiceInterface, sendEmailService_1.sendEmailService, googleAuthServicesInterface_1.googleAuthServiceInterface, googleAuthService_1.googleAuthService);
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
exports.default = authRouter;
//# sourceMappingURL=auth.js.map