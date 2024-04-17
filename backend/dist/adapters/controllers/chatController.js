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
const HttResponseStatus_1 = __importDefault(require("../../constants/HttResponseStatus"));
const createChat_1 = require("../../application/use-cases/chat/createChat");
const socket_1 = require("../../frameworks/websocket/socket");
const chatEventEnum_1 = require("../../constants/chatEventEnum");
const getChat_1 = require("../../application/use-cases/chat/getChat");
const chatController = (chatDbRepository, chatDbRepositoryImplemtation, userDbRepository, userDbRepositoryImplementation) => {
    const dbRepositoryChat = chatDbRepository(chatDbRepositoryImplemtation());
    const dbRepositoryUser = userDbRepository(userDbRepositoryImplementation());
    const createChat = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const senderId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.Id;
        const receiverId = req.params.receiverId;
        const result = yield (0, createChat_1.createOneToOneChatUseCase)(senderId, receiverId, dbRepositoryChat, dbRepositoryUser);
        if (result.participants) {
            result.participants.forEach((participant) => {
                if (participant._id.toString() === senderId)
                    return;
                (0, socket_1.emitSocketEvent)(req, participant._id.toString(), chatEventEnum_1.ChatEventEnum.NEW_CHAT_EVENT, result);
            });
        }
        res.status(200).json({
            status: HttResponseStatus_1.default.SUCCESS,
            message: 'Chat created Successfully',
            data: result,
        });
    }));
    const getAllChats = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.Id;
        const chats = yield (0, getChat_1.getAllChatsUseCase)(userId, dbRepositoryChat);
        console.log(chats);
        res.status(200).json({
            status: HttResponseStatus_1.default.SUCCESS,
            message: 'User Chats fetched Successfully',
            data: chats || [],
        });
    }));
    return {
        createChat,
        getAllChats
    };
};
exports.default = chatController;
//# sourceMappingURL=chatController.js.map