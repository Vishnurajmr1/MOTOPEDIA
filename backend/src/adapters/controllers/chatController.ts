import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import Status from '../../constants/HttResponseStatus';
import { createOneToOneChatUseCase } from '../../application/use-cases/chat/createChat';
import { ChatDbRepositoryInterface } from '../../application/repositories/chatDBRepository';
import { ChatRepositoryMongoDB } from '../../frameworks/database/mongodb/repositories/chatRepoMongoDb';
import { CustomRequest } from '../../types/customRequest';
import { usersDbInterface } from '../../application/repositories/userDBRepository';
import { UserRepositoryMongoDB } from '../../frameworks/database/mongodb/repositories/UserRepoMongoDb';
import { emitSocketEvent } from '../../frameworks/websocket/socket';
import { ChatEventEnum } from '../../constants/chatEventEnum';
import { getAllChatsUseCase } from '../../application/use-cases/chat/getChat';

const chatController = (
    chatDbRepository: ChatDbRepositoryInterface,
    chatDbRepositoryImplemtation: ChatRepositoryMongoDB,
    userDbRepository: usersDbInterface,
    userDbRepositoryImplementation: UserRepositoryMongoDB,
) => {
    const dbRepositoryChat = chatDbRepository(chatDbRepositoryImplemtation());
    const dbRepositoryUser = userDbRepository(userDbRepositoryImplementation());
    const createChat = asyncHandler(async (req: CustomRequest, res: Response) => {
        const senderId: string | undefined = req.user?.Id;
        const receiverId = req.params.receiverId;
        const result = await createOneToOneChatUseCase(senderId,receiverId, dbRepositoryChat, dbRepositoryUser);
        if (result.participants) {
            result.participants.forEach((participant) => {
                if (participant._id.toString() === senderId) return;
                emitSocketEvent(req, participant._id.toString(), ChatEventEnum.NEW_CHAT_EVENT, result);
            });
        }
        res.status(200).json({
            status: Status.SUCCESS,
            message: 'Chat created Successfully',
            data: result,
        });
    });
    const getAllChats = asyncHandler(async (req: CustomRequest, res: Response) => {
        const userId: string | undefined = req.user?.Id;
        const chats = await getAllChatsUseCase(userId,dbRepositoryChat);
        console.log(chats);
        res.status(200).json({
            status: Status.SUCCESS,
            message: 'User Chats fetched Successfully',
            data: chats || [],
        });
    });

    return{
        createChat,
        getAllChats
    }
};

export default chatController;
