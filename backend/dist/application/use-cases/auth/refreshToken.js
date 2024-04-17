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
exports.refreshTokenUseCase = void 0;
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const refreshTokenUseCase = (refreshToken, refreshDbRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    if (!refreshToken) {
        throw new appError_1.default('Refresh token not found', HttpStatusCodes_1.default.NOT_FOUND);
    }
    const existingToken = yield refreshDbRepository.findRefreshToken(refreshToken);
    if (!existingToken) {
        throw new appError_1.default('Refresh token not exists', HttpStatusCodes_1.default.UNAUTHORIZED);
    }
    const expirationDate = new Date(existingToken.expiresAt);
    if (new Date() > expirationDate) {
        throw new appError_1.default('Refresh token has expired', HttpStatusCodes_1.default.UNAUTHORIZED);
    }
    const decoded = authService.decodeToken(existingToken.token);
    const payload = {
        Id: '',
        email: '',
        role: '',
    };
    if (decoded) {
        payload.Id = (_a = decoded === null || decoded === void 0 ? void 0 : decoded.payload) === null || _a === void 0 ? void 0 : _a.Id;
        payload.email = (_b = decoded.payload) === null || _b === void 0 ? void 0 : _b.email;
        payload.role = (_c = decoded === null || decoded === void 0 ? void 0 : decoded.payload) === null || _c === void 0 ? void 0 : _c.role;
    }
    const accessToken = authService.generateToken(payload);
    return accessToken;
});
exports.refreshTokenUseCase = refreshTokenUseCase;
//# sourceMappingURL=refreshToken.js.map