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
exports.createOneToOneChatUseCase = void 0;
const appError_1 = __importDefault(require("../../../utils/appError"));
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const createOneToOneChatUseCase = (userId, recieverId, chatDbRepository, userDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!userId || !recieverId) {
            throw new appError_1.default('Please provide a proper id', HttpStatusCodes_1.default.BAD_REQUEST);
        }
        const receiver = yield userDbRepository.getUserById(recieverId);
        if (!receiver) {
            throw new appError_1.default('receiver is not found', HttpStatusCodes_1.default.NOT_FOUND);
        }
        if (receiver._id.toString() === userId) {
            throw new appError_1.default('You cannot chat with yourself', HttpStatusCodes_1.default.BAD_REQUEST);
        }
        const payload = yield chatDbRepository.createOneToOneChat(userId, receiver._id);
        if (!payload) {
            throw new appError_1.default('Internal server error', HttpStatusCodes_1.default.INTERNAL_SERVER_ERROR);
        }
        return payload;
    }
    catch (error) {
        throw new appError_1.default('Internal server error', HttpStatusCodes_1.default.BAD_GATEWAY);
    }
});
exports.createOneToOneChatUseCase = createOneToOneChatUseCase;
//# sourceMappingURL=createChat.js.map