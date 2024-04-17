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
exports.getAllMessagesUseCase = void 0;
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const getAllMessagesUseCase = (userId, chatId, chatDbRepository, chatMessageDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const selectedChat = yield chatDbRepository.getChatById(chatId);
    console.log(selectedChat);
    if (!selectedChat) {
        throw new appError_1.default('Chat does not exist', HttpStatusCodes_1.default.NOT_FOUND);
    }
    const participant = yield chatDbRepository.checkUserIsAParticipantOfChat(chatId, userId);
    if (!participant) {
        throw new appError_1.default('User is not a part of this chat', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const messages = yield chatMessageDbRepository.getAllMessages(chatId);
    return messages;
});
exports.getAllMessagesUseCase = getAllMessagesUseCase;
//# sourceMappingURL=getAllMessages.js.map