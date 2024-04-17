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
exports.getConnectionData = exports.unfollowUserUseCase = exports.followUserUseCase = void 0;
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const followUserUseCase = (currentUserId, followerId, connectionDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!currentUserId || !followerId) {
        throw new appError_1.default('Please provide a valid id', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    if (currentUserId === followerId) {
        throw new appError_1.default('Action not possible', HttpStatusCodes_1.default.CONFLICT);
    }
    const followUser = yield connectionDbRepository.followUser(currentUserId, followerId);
    return followUser;
});
exports.followUserUseCase = followUserUseCase;
const unfollowUserUseCase = (currentUserId, followerId, connectionDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!currentUserId || !followerId) {
        throw new appError_1.default('Please provide a valid id', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    if (currentUserId === followerId) {
        throw new appError_1.default('Action not possible', HttpStatusCodes_1.default.CONFLICT);
    }
    const followUser = yield connectionDbRepository.unfollowUser(currentUserId, followerId);
    return followUser;
});
exports.unfollowUserUseCase = unfollowUserUseCase;
const getConnectionData = (currentUserId, connectionDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!currentUserId) {
        throw new appError_1.default('Please provide a valid id', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const connectionData = yield connectionDbRepository.getFullUserList(currentUserId);
    return connectionData;
});
exports.getConnectionData = getConnectionData;
//# sourceMappingURL=followUser.js.map