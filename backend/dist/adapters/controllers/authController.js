"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userAuth_1 = require("../../application/use-cases/auth/userAuth");
const adminAuth_1 = require("../../application/use-cases/auth/adminAuth");
const HttResponseStatus_1 = __importDefault(require("../../constants/HttResponseStatus"));
const authController = (authServiceInterface, authServiceImplementation, userDbRepository, userDbRepositoryImplementation, adminDbRepository, adminDbRepositoryImplementation, refreshTokenDbRepository, refreshTokenDbRepositoryImplementation, sendEmailInterface, sendEmailImplementation, googleAuthInterface, googleAuthImplementation) => {
    const dbRepositoryUser = userDbRepository(userDbRepositoryImplementation());
    const dbRepositoryAdmin = adminDbRepository(adminDbRepositoryImplementation());
    const dbRepositoryRefreshToken = refreshTokenDbRepository(refreshTokenDbRepositoryImplementation());
    const authService = authServiceInterface(authServiceImplementation());
    const emailService = sendEmailInterface(sendEmailImplementation());
    const googleAuthService = googleAuthInterface(googleAuthImplementation());
    const registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.body;
        const { userData } = yield (0, userAuth_1.userRegister)(user, dbRepositoryUser, dbRepositoryRefreshToken, authService, emailService);
        res.status(200).json({
            status: 'success',
            message: `Email verification otp send successfully to ${userData.email}`,
            data: userData,
        });
    }));
    const loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        const { accessToken, refreshToken, user } = yield (0, userAuth_1.userLogin)(email, password, dbRepositoryUser, dbRepositoryRefreshToken, authService);
        res.status(200).json({
            status: 'success',
            message: 'User logged in successfully',
            data: { accessToken, refreshToken, user }
        });
    }));
    const loginAdmin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        const { accessToken, refreshToken } = yield (0, adminAuth_1.adminLogin)(email, password, dbRepositoryAdmin, dbRepositoryRefreshToken, authService);
        res.status(200).json({
            status: 'success',
            message: 'Successfully logged in',
            data: { accessToken, refreshToken }
        });
    }));
    const loginWithGoogle = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { credential } = req.body;
        const { accessToken, refreshToken } = yield (0, userAuth_1.signInWithGoogle)(credential, googleAuthService, dbRepositoryUser, dbRepositoryRefreshToken, authService);
        res.status(200).json({
            status: 'success',
            message: 'Successfully logged in with google',
            data: { accessToken, refreshToken }
        });
    }));
    const verifyUserEmail = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, otp } = req.body;
        const { accessToken, refreshToken, user } = yield (0, userAuth_1.verifyOtp)(email, otp, authService, dbRepositoryUser, dbRepositoryRefreshToken);
        res.status(200).json({
            status: 'success',
            message: 'OTP verified successfully',
            data: { accessToken, refreshToken, user }
        });
    }));
    const resendOtpverify = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email } = req.body;
        yield (0, userAuth_1.resendOtp)(email, dbRepositoryUser, emailService);
        res.status(200).json({
            status: 'success',
            message: `Email verification otp send successfully to ${email}`,
            data: null
        });
    }));
    const forgotPassword = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email } = req.body;
        yield (0, userAuth_1.resetPassword)(email, authService, dbRepositoryUser, dbRepositoryRefreshToken, emailService);
        res.status(200).json({
            status: 'success',
            message: `Please reset new Password using the link provied to ${email}`,
            data: null
        });
    }));
    const resetPasswordByEmail = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { token } = req.body;
        yield (0, userAuth_1.ResetPasswordToken)(token, authService, dbRepositoryUser, dbRepositoryRefreshToken);
        res.status(200).json({
            status: 'success',
            message: 'Please reset the password',
            data: null
        });
    }));
    const confirmPassword = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { token, newPassword } = req.body;
        yield (0, userAuth_1.confirmNewPassword)(token, newPassword, authService, dbRepositoryUser);
        res.status(200).json({
            status: HttResponseStatus_1.default.SUCCESS,
            message: 'Password reset successfully completed',
            data: null
        });
    }));
    const logoutUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.status(200).json({
            status: 'success',
            message: `Logout successfully`,
            data: null
        });
    }));
    return {
        registerUser,
        loginAdmin,
        loginUser,
        verifyUserEmail,
        resendOtpverify,
        logoutUser,
        loginWithGoogle,
        forgotPassword,
        resetPasswordByEmail,
        confirmPassword,
    };
};
exports.default = authController;
//# sourceMappingURL=authController.js.map