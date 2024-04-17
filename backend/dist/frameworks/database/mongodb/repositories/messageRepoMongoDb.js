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
exports.chatMessageRepositoryMongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const message_1 = require("../models/message");
const chatMessageCommonAggregation = () => {
    return [
        {
            $lookup: {
                from: 'user',
                foreignField: '_id',
                localField: 'sender',
                as: 'sender',
                pipeline: [
                    {
                        $project: {
                            firstName: 1,
                            lastName: 1,
                            email: 1,
                            profilePic: 1,
                        },
                    },
                ],
            },
        },
        {
            $addFields: {
                sender: { $first: '$sender' },
            },
        },
    ];
};
const chatMessageRepositoryMongoDB = () => {
    const getAllMessages = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
        const messages = yield message_1.ChatMessage.aggregate([
            {
                $match: {
                    chat: new mongoose_1.default.Types.ObjectId(chatId),
                },
            },
            ...chatMessageCommonAggregation(),
            {
                $sort: {
                    createdAt: 1,
                },
            },
        ]);
        return messages;
    });
    const sendMessage = (messageInfo) => __awaiter(void 0, void 0, void 0, function* () {
        const newMessage = yield message_1.ChatMessage.create(messageInfo);
        return newMessage;
    });
    const maintainMessage = (newMessageId) => __awaiter(void 0, void 0, void 0, function* () {
        const messages = yield message_1.ChatMessage.aggregate([
            {
                $match: {
                    _id: new mongoose_1.default.Types.ObjectId(newMessageId),
                },
            },
            ...chatMessageCommonAggregation(),
        ]);
        const receivedMessage = messages[0];
        return receivedMessage;
    });
    return {
        getAllMessages,
        sendMessage,
        maintainMessage,
    };
};
exports.chatMessageRepositoryMongoDB = chatMessageRepositoryMongoDB;
//# sourceMappingURL=messageRepoMongoDb.js.map