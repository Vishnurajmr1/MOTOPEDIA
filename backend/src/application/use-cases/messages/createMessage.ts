import { ChatDbRepositoryInterface } from '../../../application/repositories/chatDBRepository';
import { ChatMessageDbRepositoryInterface } from '../../../application/repositories/messageDBRepository';
import { CloudServiceInterface } from '../../../application/services/cloudServiceInterface';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import { IaddMessage } from '../../../types/messageInterface';
import AppError from '../../../utils/appError';

export const createChatMessageUseCase = async (
    chatId: string,
    userId: string | undefined,
    content: IaddMessage,
    file: Express.Multer.File,
    cloudService: ReturnType<CloudServiceInterface>,
    chatMessageDbRepository: ReturnType<ChatMessageDbRepositoryInterface>,
    chatDbRepository: ReturnType<ChatDbRepositoryInterface>,
) => {
    if (!content.content) {
        throw new AppError('Message content or attachement is required', HttpStatusCodes.BAD_REQUEST);
    }
    if (!chatId || !userId) {
        throw new AppError('Unable to get the id', HttpStatusCodes.BAD_REQUEST);
    }

    const selectedChat = await chatDbRepository.getChatById(chatId);
    if (!selectedChat) {
        throw new AppError('Chat does not exist', HttpStatusCodes.NOT_FOUND);
    }
    let messageFiles: any[] = [];
    if (file) {
        let response: any;
        let responseUrl: string = '';
        if (file.mimetype.includes('image')) {
            response = await cloudService.upload(file, 'Chats/photo');
            responseUrl = await cloudService.getFile(response.key);
        } else if (file.mimetype.includes('pdf')) {
            response = await cloudService.upload(file, 'Chats/pdf');
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
    const message = await chatMessageDbRepository.sendMessage(content);
    const chat = await chatDbRepository.updateLastMessageChat(chatId, message._id.toString());
    const messages = await chatMessageDbRepository.maintainMessage(message._id.toString());
    const receivedMessage = messages;
    if (!receivedMessage) {
        throw new AppError('Internal Server error', HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
    return { receivedMessage, chat };
};
