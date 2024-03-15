import { ChatRepositoryMongoDB } from '@src/frameworks/database/mongodb/repositories/chatRepoMongoDb';

export const chatDbRepository = (repository: ReturnType<ChatRepositoryMongoDB>) => {
    const createOneToOneChat = async (senderId: string, recieverId: string) =>
        await repository.createOrGetOneToOneChat(senderId, recieverId);
    const createAGroupChat = async (name: string, members: [string], userId: string) =>
        await repository.createAGroupChat(name, members, userId);
    const getGroupChatDetails = async (chatId: string) => await repository.getGroupChatDetails(chatId);
    const getAllChats = async (userId: string) => await repository.getAllChats(userId);
    const checkUserIsAParticipantOfChat = async (chatId: string,userId:string) => await repository.checkUserIsAParticipantOfChat(chatId,userId);
    const getChatById = async (chatId: string) => await repository.getChatById(chatId);
    const renameGroupChat = async (chatId: string, name: string) => await repository.renameGroupChat(chatId, name);
    const updateLastMessageChat = async (chatId: string, messageId: string) =>
        await repository.updateLastMessageChat(chatId, messageId);
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

export type ChatDbRepositoryInterface = typeof chatDbRepository;
