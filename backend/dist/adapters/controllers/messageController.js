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
const getAllMessages_1 = require("../../application/use-cases/messages/getAllMessages");
const HttResponseStatus_1 = __importDefault(require("../../constants/HttResponseStatus"));
const createMessage_1 = require("../../application/use-cases/messages/createMessage");
const socket_1 = require("../../frameworks/websocket/socket");
const chatEventEnum_1 = require("../../constants/chatEventEnum");
const messageController = (cloudServiceInterface, cloudServiceImpl, chatDbRepository, chatDbRepositoryImpl, chatMessageDbRepository, chatMessageDbRepositoryImpl) => {
    const dbRepositoryChat = chatDbRepository(chatDbRepositoryImpl());
    const dbRepositoryChatMessage = chatMessageDbRepository(chatMessageDbRepositoryImpl());
    const cloudService = cloudServiceInterface(cloudServiceImpl());
    const sendMessage = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        console.log('hello');
        const chatId = req.params.chatId;
        const content = req.body;
        const file = req.file;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.Id;
        const { receivedMessage, chat } = yield (0, createMessage_1.createChatMessageUseCase)(chatId, userId, content, file, cloudService, dbRepositoryChatMessage, dbRepositoryChat);
        chat.participants.forEach((participantObjectId) => {
            if (participantObjectId.toString() === userId)
                return;
            (0, socket_1.emitSocketEvent)(req, participantObjectId.toString(), chatEventEnum_1.ChatEventEnum.MESSAGE_RECEIVED_EVENT, receivedMessage);
        });
        res.json({
            status: HttResponseStatus_1.default.SUCCESS,
            message: 'Message saved Successfully',
            data: receivedMessage,
        });
    }));
    const getAllMessages = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const { chatId } = req.params;
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.Id;
        const messages = yield (0, getAllMessages_1.getAllMessagesUseCase)(userId, chatId, dbRepositoryChat, dbRepositoryChatMessage);
        res.json({
            status: HttResponseStatus_1.default.SUCCESS,
            messages: 'Messages fetched successfully',
            data: messages || [],
        });
    }));
    return {
        sendMessage,
        getAllMessages,
    };
};
exports.default = messageController;
//# sourceMappingURL=messageController.js.map