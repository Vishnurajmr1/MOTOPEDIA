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
const refreshToken_1 = require("../../application/use-cases/auth/refreshToken");
const refreshTokenController = (authServiceInterface, authServiceImplementation, refreshTokenDbRepository, refreshTokenRepositoryImplementation) => {
    const dbRepositoryRefreshToken = refreshTokenDbRepository(refreshTokenRepositoryImplementation());
    const authService = authServiceInterface(authServiceImplementation());
    const refreshToken = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let refreshToken = req.body.refreshToken;
        const response = yield (0, refreshToken_1.refreshTokenUseCase)(refreshToken, dbRepositoryRefreshToken, authService);
        res.status(200).json({
            status: 'success',
            message: 'Successfully refreshed token',
            accessToken: response,
        });
    }));
    return {
        refreshToken,
    };
};
exports.default = refreshTokenController;
//# sourceMappingURL=refreshTokenController.js.map