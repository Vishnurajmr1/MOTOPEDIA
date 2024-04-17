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
exports.confirmNewPassword = exports.ResetPasswordToken = exports.resetPassword = exports.signInWithGoogle = exports.verifyOtp = exports.resendOtp = exports.userLogin = exports.userRegister = void 0;
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const generateOtp_1 = __importDefault(require("../../../utils/generateOtp"));
const resetPassword_1 = require("../../../utils/templates/resetPassword");
const verifyEmail_1 = require("../../../utils/templates/verifyEmail");
const userRegister = (user, userRepository, refreshTokenRepository, authService, sendEmailService) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    user.email = (_a = user === null || user === void 0 ? void 0 : user.email) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    const isEmailAlreadyRegistered = yield userRepository.getUserByEmail(user.email);
    if (isEmailAlreadyRegistered) {
        throw new appError_1.default('User with same email already exists...!', HttpStatusCodes_1.default.CONFLICT);
    }
    if (user.password) {
        user.password = yield authService.hashPassword(user.password);
    }
    const otp = (0, generateOtp_1.default)();
    const emailTempalte = (0, verifyEmail_1.verifyEmailTemplate)(otp);
    const result = yield sendEmailService.sendEmail({
        to: user.email,
        subject: 'Motopedia-verification',
        text: emailTempalte.text,
        html: emailTempalte.html,
    });
    if (!result) {
        throw new appError_1.default('OOps something went wrong!Please try again later!', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    user.isVerifiedEmail = false;
    user.otp = otp;
    const userData = yield userRepository.addUser(user);
    return { userData };
});
exports.userRegister = userRegister;
const userLogin = (email, password, userRepository, refreshTokenRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.getUserByEmail(email);
    if (!user) {
        throw new appError_1.default("This user doesn't exist", HttpStatusCodes_1.default.NOT_FOUND);
    }
    const isPasswordCorrect = yield authService.comparePassword(password, user.password);
    if (!isPasswordCorrect) {
        throw new appError_1.default('Sorry,your password is incorrect.Please try again', HttpStatusCodes_1.default.UNAUTHORIZED);
    }
    if (!user.isVerifiedEmail) {
        throw new appError_1.default('Sorry your email is not verified.Please signup and verify your email', HttpStatusCodes_1.default.UNAUTHORIZED);
    }
    if (user.isBlocked) {
        throw new appError_1.default('You are blocked by our admin.Contact us for enquiry', HttpStatusCodes_1.default.UNAVAILABLE_FOR_LEGAL_REASONS);
    }
    const payload = {
        Id: user._id,
        email: user.email,
        role: 'user',
    };
    yield refreshTokenRepository.deleteRefreshToken(user._id);
    const accessToken = authService.generateToken(payload);
    const refreshToken = authService.generateRefreshToken(payload);
    const expiratonDate = authService.decodedTokenAndReturnExpireDate(refreshToken);
    yield refreshTokenRepository.saveRefreshToken(user._id, refreshToken, expiratonDate);
    return { accessToken, refreshToken, user };
});
exports.userLogin = userLogin;
const resendOtp = (email, userRepository, sendEmailService) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.getUserByEmail(email);
    if (!user) {
        throw new appError_1.default('Email not registered!Please signup', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    if (user.isVerifiedEmail) {
        throw new appError_1.default('Email already verified', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const otp = (0, generateOtp_1.default)();
    const emailTemplate = (0, verifyEmail_1.verifyEmailTemplate)(otp);
    const result = yield sendEmailService.sendEmail({
        to: user.email,
        subject: 'Motopedia-verification',
        text: emailTemplate.text,
        html: emailTemplate.html,
    });
    if (!result) {
        throw new appError_1.default('OOps something went wrong!Please try again later!', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    user.otp = otp;
    yield userRepository.updateProfile(user._id, {
        otp: user.otp,
    });
});
exports.resendOtp = resendOtp;
const verifyOtp = (email, otp, authService, userRepository, refreshTokenRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.getUserByEmail(email);
    if (!user) {
        throw new appError_1.default('Email not registerd!Please signup', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    if (user && user.isVerifiedEmail) {
        throw new appError_1.default('Email already verified', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    if (otp !== user.otp) {
        throw new appError_1.default('Invalid OTP.Please check your OTP and try again.', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    user.otp = null;
    user.isVerifiedEmail = true;
    yield userRepository.updateProfile(user._id, {
        isVerifiedEmail: user.isVerifiedEmail,
        otp: user.otp,
        currentPassword: ''
    });
    const payload = {
        Id: user._id,
        email,
        role: 'user',
    };
    yield refreshTokenRepository.deleteRefreshToken(user._id);
    const accessToken = authService.generateToken(payload);
    const refreshToken = authService.generateRefreshToken(payload);
    const expiratonDate = authService.decodedTokenAndReturnExpireDate(refreshToken);
    yield refreshTokenRepository.saveRefreshToken(user._id, refreshToken, expiratonDate);
    return { accessToken, refreshToken, user };
});
exports.verifyOtp = verifyOtp;
const signInWithGoogle = (credential, googleAuthService, userRepository, refreshTokenRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield googleAuthService.verify(credential);
    const isUserExist = yield userRepository.getUserByEmail(user.email);
    if (isUserExist) {
        const payload = {
            Id: isUserExist._id,
            email: isUserExist.email,
            role: 'user',
        };
        yield refreshTokenRepository.deleteRefreshToken(isUserExist._id);
        const accessToken = authService.generateToken(payload);
        const refreshToken = authService.generateRefreshToken(payload);
        const expiratonDate = authService.decodedTokenAndReturnExpireDate(refreshToken);
        yield refreshTokenRepository.saveRefreshToken(isUserExist._id, refreshToken, expiratonDate);
        return { accessToken, refreshToken };
    }
    else {
        const { _id: userId, email } = yield userRepository.addUser(user);
        const payload = { Id: userId, email, role: 'user' };
        const accessToken = authService.generateToken(payload);
        const refreshToken = authService.generateRefreshToken(payload);
        const expiratonDate = authService.decodedTokenAndReturnExpireDate(refreshToken);
        yield refreshTokenRepository.saveRefreshToken(userId, refreshToken, expiratonDate);
        return { accessToken, refreshToken };
    }
});
exports.signInWithGoogle = signInWithGoogle;
const resetPassword = (email, authService, userRepository, refreshTokenRepository, sendEmailService) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.getUserByEmail(email);
    if (!user) {
        throw new appError_1.default('Email not registered!Please signup', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const payload = {
        Id: user._id,
        email: user === null || user === void 0 ? void 0 : user.email,
        role: 'user',
    };
    yield refreshTokenRepository.deleteRefreshToken(user._id);
    const accessToken = authService.generateToken(payload);
    const refreshToken = authService.generateRefreshToken(payload);
    const expiratonDate = authService.decodedTokenAndReturnExpireDate(refreshToken);
    const emailTemplate = (0, resetPassword_1.resetPassEmailTemplate)(refreshToken);
    const result = yield sendEmailService.sendEmail({
        to: user.email,
        subject: 'Motopedia-Reset Password',
        text: emailTemplate.text,
        html: emailTemplate.html,
    });
    if (!result) {
        throw new appError_1.default('OOps something went wrong!Please try again later!', HttpStatusCodes_1.default.BAD_REQUEST);
    }
});
exports.resetPassword = resetPassword;
const ResetPasswordToken = (token, authService, userRepository, refreshTokenRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new appError_1.default('Please provide token', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const decoded = authService.decodeToken(token);
    if (!decoded) {
        throw new appError_1.default('Invalid Token', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const userId = decoded.payload.Id;
    if (decoded.exp && new Date() > new Date(decoded.exp * 1000)) {
        throw new appError_1.default('Token has expired', HttpStatusCodes_1.default.FORBIDDEN);
    }
});
exports.ResetPasswordToken = ResetPasswordToken;
const confirmNewPassword = (token, newPassword, authService, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = authService.decodeToken(token);
    const id = decoded.payload.Id;
    if (decoded.exp && (decoded.exp * 1000 < Date.now())) {
        throw new appError_1.default('Token has expired', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    else {
        const hashedPassword = yield authService.hashPassword(newPassword);
        yield userRepository.changePassword(id, hashedPassword);
    }
});
exports.confirmNewPassword = confirmNewPassword;
//# sourceMappingURL=userAuth.js.map