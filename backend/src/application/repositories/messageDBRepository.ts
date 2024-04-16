import { IaddMessage } from '../../types/messageInterface';
import { ChatMessageRepositoryMongoDB } from '../../frameworks/database/mongodb/repositories/messageRepoMongoDb';

export const chatMessageDbRepository = (repository: ReturnType<ChatMessageRepositoryMongoDB>) => {
    const getAllMessages = async (chatId: string) => await repository.getAllMessages(chatId);
    const sendMessage = async (messageInfo: IaddMessage) => await repository.sendMessage(messageInfo);
    const maintainMessage = async (messageId: string) => await repository.maintainMessage(messageId);

    return {
        getAllMessages,
        sendMessage,
        maintainMessage,
    };
};

export type ChatMessageDbRepositoryInterface = typeof chatMessageDbRepository;
