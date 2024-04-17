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
exports.refreshTokenRepositoryMongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const token_1 = __importDefault(require("../models/token"));
const refreshTokenRepositoryMongoDB = () => {
    const saveRefreshToken = (userId, token, expiresAt) => __awaiter(void 0, void 0, void 0, function* () {
        const refreshToken = new token_1.default({
            userId,
            token,
            expiresAt,
        });
        yield refreshToken.save();
    });
    const deleteRefreshToken = (id) => __awaiter(void 0, void 0, void 0, function* () {
        yield token_1.default.deleteOne({ userId: new mongoose_1.default.Types.ObjectId(id) });
    });
    const findRefreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        const convertedToken = refreshToken.split(' ')[1];
        const token = yield token_1.default.findOne({ token: convertedToken });
        return token;
    });
    const findRefreshTokenByUserId = (id, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        return yield token_1.default.findOne({ userId: new mongoose_1.default.Types.ObjectId(id) }, { token: refreshToken });
    });
    return {
        saveRefreshToken,
        deleteRefreshToken,
        findRefreshToken,
        findRefreshTokenByUserId
    };
};
exports.refreshTokenRepositoryMongoDB = refreshTokenRepositoryMongoDB;
//# sourceMappingURL=refreshTokenRepoMongoDb.js.map