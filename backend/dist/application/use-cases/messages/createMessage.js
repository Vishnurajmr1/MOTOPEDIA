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
exports.createChatMessageUseCase = void 0;
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const createChatMessageUseCase = (chatId, userId, content, file, cloudService, chatMessageDbRepository, chatDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!content.content) {
        throw new appError_1.default('Message content or attachement is required', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    if (!chatId || !userId) {
        throw new appError_1.default('Unable to get the id', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const selectedChat = yield chatDbRepository.getChatById(chatId);
    if (!selectedChat) {
        throw new appError_1.default('Chat does not exist', HttpStatusCodes_1.default.NOT_FOUND);
    }
    let messageFiles = [];
    if (file) {
        let response;
        let responseUrl = '';
        if (file.mimetype.includes('image')) {
            response = yield cloudService.upload(file, 'Chats/photo');
            responseUrl = yield cloudService.getFile(response.key);
        }
        else if (file.mimetype.includes('pdf')) {
            response = yield cloudService.upload(file, 'Chats/pdf');
        }
        console.log(response, responseUrl);
        if (file) {
            messageFiles.push({
                file: response,
                url: responseUrl,
            });
        }
    }
    content.sender = userId;
    content.chat = chatId;
    content.attachments = messageFiles;
    const message = yield chatMessageDbRepository.sendMessage(content);
    const chat = yield chatDbRepository.updateLastMessageChat(chatId, message._id.toString());
    const messages = yield chatMessageDbRepository.maintainMessage(message._id.toString());
    const receivedMessage = messages;
    if (!receivedMessage) {
        throw new appError_1.default('Internal Server error', HttpStatusCodes_1.default.INTERNAL_SERVER_ERROR);
    }
    return { receivedMessage, chat };
});
exports.createChatMessageUseCase = createChatMessageUseCase;
//# sourceMappingURL=createMessage.js.map