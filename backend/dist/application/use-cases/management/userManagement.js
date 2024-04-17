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
exports.unblockUserUseCase = exports.blockUserUseCase = exports.getAllUsersUseCase = void 0;
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const getAllUsersUseCase = (userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userRepository.getAllUsers();
    return users;
});
exports.getAllUsersUseCase = getAllUsersUseCase;
const blockUserUseCase = (userId, reason, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId) {
        throw new appError_1.default('Invalid user details', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    if (!reason) {
        throw new appError_1.default('Please provide a reason to block the user', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const user = yield userRepository.getUserById(userId);
    if (user === null || user === void 0 ? void 0 : user.isBlocked) {
        throw new appError_1.default('Already Blocked this user', HttpStatusCodes_1.default.CONFLICT);
    }
    yield userRepository.blockUser(userId, reason);
});
exports.blockUserUseCase = blockUserUseCase;
const unblockUserUseCase = (userId, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId) {
        throw new appError_1.default('Invalid User details', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    yield userRepository.unblockUser(userId);
});
exports.unblockUserUseCase = unblockUserUseCase;
//# sourceMappingURL=userManagement.js.map