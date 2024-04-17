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
exports.chatRepositoryMongoDB = void 0;
const chat_1 = __importDefault(require("../models/chat"));
const message_1 = require("../models/message");
const mongoose_1 = __importDefault(require("mongoose"));
const chatCommonAggregation = () => {
    return [
        {
            $lookup: {
                from: 'user',
                foreignField: '_id',
                localField: 'participants',
                as: 'participants',
                pipeline: [
                    {
                        $project: {
                            password: 0,
                            otp: 0,
                            isVerifiedEmail: 0,
                            isGoogleUser: 0,
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: 'chatmessages',
                foreignField: '_id',
                localField: 'lastMessage',
                as: 'lastMessage',
                pipeline: [
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
                ],
            },
        },
        {
            $addFields: {
                lastMessage: { $first: '$lastMessage' },
            },
        },
    ];
};
const chatRepositoryMongoDB = () => {
    const deleteCascadeChatMessages = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
        const messages = yield message_1.ChatMessage.find({
            chat: new mongoose_1.default.Types.ObjectId(chatId),
        });
        // let attachments = [];
        // attachments = attachments.concat(
        //     ...messages.map((message) => {
        //       return message.attachments.at(0)?.url?.key
        //     })
        //   );
        yield message_1.ChatMessage.deleteMany({
            chat: new mongoose_1.default.Types.ObjectId(chatId),
        });
    });
    const createOrGetOneToOneChat = (userId, recieverId) => __awaiter(void 0, void 0, void 0, function* () {
        const chat = yield chat_1.default.aggregate([
            {
                $match: {
                    isGroupChat: false,
                    $and: [
                        {
                            participants: { $elemMatch: { $eq: new mongoose_1.default.Types.ObjectId(userId) } },
                        },
                        {
                            participants: { $elemMatch: { $eq: new mongoose_1.default.Types.ObjectId(recieverId) } },
                        },
                    ],
                },
            },
            ...chatCommonAggregation(),
        ]);
        if (chat.length) {
            return chat[0];
        }
        const newChatInstance = yield chat_1.default.create({
            name: 'One on one Chat',
            participants: [userId, recieverId],
            admin: userId,
        });
        const createChat = yield chat_1.default.aggregate([
            {
                $match: {
                    _id: newChatInstance._id,
                },
            },
            ...chatCommonAggregation(),
        ]);
        const payload = createChat[0];
        if (payload)
            return payload;
    });
    const createAGroupChat = (name, members, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const groupChat = yield chat_1.default.create({
            name,
            isGroupChat: true,
            participants: members,
            admin: userId,
        });
        const chat = yield chat_1.default.aggregate([
            {
                $match: {
                    _id: groupChat._id,
                },
            },
            ...chatCommonAggregation(),
        ]);
        const payload = chat[0];
        if (payload)
            return payload;
    });
    const getGroupChatDetails = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
        const groupChat = yield chat_1.default.aggregate([
            {
                $match: {
                    _id: new mongoose_1.default.Types.ObjectId(chatId),
                    isGroupChat: true,
                },
            },
            ...chatCommonAggregation(),
        ]);
        const chat = groupChat[0];
        if (chat)
            return chat;
    });
    const renameGroupChat = (chatId, name) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedGroupChat = yield chat_1.default.findByIdAndUpdate(chatId, { $set: { name } }, { new: true });
        const chat = yield chat_1.default.aggregate([
            {
                $match: {
                    _id: updatedGroupChat === null || updatedGroupChat === void 0 ? void 0 : updatedGroupChat._id,
                },
            },
            ...chatCommonAggregation(),
        ]);
        const payload = chat[0];
        return payload;
    });
    const getAllChats = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const chats = yield chat_1.default.aggregate([
            {
                $match: {
                    participants: { $elemMatch: { $eq: new mongoose_1.default.Types.ObjectId(userId) } }
                }
            },
            {
                $sort: {
                    updatedAt: 1
                }
            },
            ...chatCommonAggregation()
        ]);
        return chats;
    });
    const getChatById = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
        const chat = yield chat_1.default.findById(chatId);
        return chat;
    });
    const checkUserIsAParticipantOfChat = (chatId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const particpants = yield chat_1.default.aggregate([
            {
                $match: {
                    _id: new mongoose_1.default.Types.ObjectId(chatId),
                    participants: { $elemMatch: { $eq: new mongoose_1.default.Types.ObjectId(userId) } }
                }
            },
            {
                $limit: 1
            }
        ]);
        return particpants.length > 0;
    });
    const updateLastMessageChat = (chatId, messageId) => __awaiter(void 0, void 0, void 0, function* () {
        const chat = yield chat_1.default.findByIdAndUpdate(chatId, {
            $set: {
                lastMessage: new mongoose_1.default.Types.ObjectId(messageId)
            }
        }, { new: true });
        return chat;
    });
    return {
        createAGroupChat,
        createOrGetOneToOneChat,
        getGroupChatDetails,
        getAllChats,
        renameGroupChat,
        updateLastMessageChat,
        getChatById,
        checkUserIsAParticipantOfChat
    };
};
exports.chatRepositoryMongoDB = chatRepositoryMongoDB;
//# sourceMappingURL=chatRepoMongoDb.js.map