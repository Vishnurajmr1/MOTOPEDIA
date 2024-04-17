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
exports.chatDbRepository = void 0;
const chatDbRepository = (repository) => {
    const createOneToOneChat = (senderId, recieverId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.createOrGetOneToOneChat(senderId, recieverId); });
    const createAGroupChat = (name, members, userId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.createAGroupChat(name, members, userId); });
    const getGroupChatDetails = (chatId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getGroupChatDetails(chatId); });
    const getAllChats = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllChats(userId); });
    const checkUserIsAParticipantOfChat = (chatId, userId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.checkUserIsAParticipantOfChat(chatId, userId); });
    const getChatById = (chatId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getChatById(chatId); });
    const renameGroupChat = (chatId, name) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.renameGroupChat(chatId, name); });
    const updateLastMessageChat = (chatId, messageId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.updateLastMessageChat(chatId, messageId); });
    return {
        createAGroupChat,
        createOneToOneChat,
        getGroupChatDetails,
        getAllChats,
        renameGroupChat,
        updateLastMessageChat,
        getChatById,
        checkUserIsAParticipantOfChat,
    };
};
exports.chatDbRepository = chatDbRepository;
//# sourceMappingURL=chatDBRepository.js.map