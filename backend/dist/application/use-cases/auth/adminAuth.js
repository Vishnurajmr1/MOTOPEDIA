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
exports.adminLogin = void 0;
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const adminLogin = (email, password, adminRepository, refreshTokenRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield adminRepository.getAdminByEmail(email);
    if (!admin) {
        throw new appError_1.default('Admin not found...!', HttpStatusCodes_1.default.UNAUTHORIZED);
    }
    const isPasswordCorrect = yield authService.comparePassword(password, admin.password);
    if (!isPasswordCorrect) {
        throw new appError_1.default('Sorry,your password is incorrect,Please try again', HttpStatusCodes_1.default.UNAUTHORIZED);
    }
    const payload = {
        Id: admin._id,
        email: admin.email,
        role: 'admin',
    };
    yield refreshTokenRepository.deleteRefreshToken(admin._id);
    const accessToken = authService.generateToken(payload);
    const refreshToken = authService.generateRefreshToken(payload);
    const expirationDate = authService.decodedTokenAndReturnExpireDate(refreshToken);
    yield refreshTokenRepository.saveRefreshToken(admin._id, refreshToken, expirationDate);
    return {
        accessToken,
        refreshToken,
    };
});
exports.adminLogin = adminLogin;
//# sourceMappingURL=adminAuth.js.map