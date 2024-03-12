import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { ChatDbRepositoryInterface } from '../../application/repositories/chatDBRepository';
import { ChatMessageDbRepositoryInterface } from '../../application/repositories/messageDBRepository';
import { CloudServiceInterface } from '../../application/services/cloudServiceInterface';
import { ChatRepositoryMongoDB } from '../../frameworks/database/mongodb/repositories/chatRepoMongoDb';
import { ChatMessageRepositoryMongoDB } from '../../frameworks/database/mongodb/repositories/messageRepoMongoDb';
import { CloudServiceImpl } from '../../frameworks/services/s3Service';
import { CustomRequest } from '../../types/customRequest';
import { getAllMessagesUseCase } from '@src/application/use-cases/messages/getAllMessages';
import Status from '@src/constants/HttResponseStatus';
import { createChatMessageUseCase } from '@src/application/use-cases/messages/createMessage';
import { IaddMessage } from '@src/types/messageInterface';
import { emitSocketEvent } from '@src/frameworks/websocket/socket';
import { ChatEventEnum } from '@src/constants/chatEventEnum';

const messageController = (
    cloudServiceInterface: CloudServiceInterface,
    cloudServiceImpl: CloudServiceImpl,
    chatDbRepository: ChatDbRepositoryInterface,
    chatDbRepositoryImpl: ChatRepositoryMongoDB,
    chatMessageDbRepository: ChatMessageDbRepositoryInterface,
    chatMessageDbRepositoryImpl: ChatMessageRepositoryMongoDB,
) => {
    const dbRepositoryChat = chatDbRepository(chatDbRepositoryImpl());
    const dbRepositoryChatMessage = chatMessageDbRepository(chatMessageDbRepositoryImpl());
    const cloudService = cloudServiceInterface(cloudServiceImpl());

    const sendMessage = asyncHandler(async (req: CustomRequest, res: Response) => {
        const { chatId } = req.params;
        const content: IaddMessage = req.body;
        const file: Express.Multer.File= req.file as Express.Multer.File;
        const userId = req.user?.Id;
        const { receivedMessage, chat } = await createChatMessageUseCase(
            chatId,
            userId,
            content,
            file,
            cloudService,
            dbRepositoryChatMessage,
            dbRepositoryChat,
        );
        chat?.participants.forEach((participantObjectId) => {
            if (participantObjectId.toString() === userId) return;
            emitSocketEvent(req, participantObjectId.toString(), ChatEventEnum.MESSAGE_RECEIVED_EVENT, receivedMessage);
        });
        res.json({
            status: Status.SUCCESS,
            message: 'Message saved Successfully',
            data: receivedMessage,
        });
    });
    const getAllMessages = asyncHandler(async (req: CustomRequest, res: Response) => {
        const { chatId } = req.params;
        const userId: string | undefined = req.user?.Id;
        const messages = await getAllMessagesUseCase(userId, chatId, dbRepositoryChat, dbRepositoryChatMessage);
        res.json({
            status: Status.SUCCESS,
            messages: 'Messages fetched successfully',
            data: messages || [],
        });
    });
    return {
        sendMessage,
        getAllMessages,
    };
};

export default messageController;
