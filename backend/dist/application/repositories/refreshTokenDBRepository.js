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
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenDbRepository = void 0;
const refreshTokenDbRepository = (repository) => {
    const saveRefreshToken = (userId, token, expirestAt) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.saveRefreshToken(userId, token, expirestAt); });
    const deleteRefreshToken = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.deleteRefreshToken(id); });
    const findRefreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.findRefreshToken(refreshToken); });
    const findRefreshTokenByUserId = (id, refreshToken) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.findRefreshTokenByUserId(id, refreshToken); });
    return {
        saveRefreshToken,
        deleteRefreshToken,
        findRefreshToken,
        findRefreshTokenByUserId
    };
};
exports.refreshTokenDbRepository = refreshTokenDbRepository;
//# sourceMappingURL=refreshTokenDBRepository.js.map