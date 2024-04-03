import AppError from '../../../utils/appError';
import { ChatDbRepositoryInterface } from '../../../application/repositories/chatDBRepository';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import { usersDbInterface } from '../../../application/repositories/userDBRepository';


export const createOneToOneChatUseCase = async (
    userId: string | undefined,
    recieverId: string,
    chatDbRepository: ReturnType<ChatDbRepositoryInterface>,
    userDbRepository: ReturnType<usersDbInterface>,
) => {
    try {
        if (!userId || !recieverId) {
            throw new AppError('Please provide a proper id', HttpStatusCodes.BAD_REQUEST);
        }

        const receiver = await userDbRepository.getUserById(recieverId);
        if (!receiver) {
            throw new AppError('receiver is not found', HttpStatusCodes.NOT_FOUND);
        }
        if (receiver._id.toString() === userId) {
            throw new AppError('You cannot chat with yourself', HttpStatusCodes.BAD_REQUEST);
        }
        const payload = await chatDbRepository.createOneToOneChat(userId, receiver._id);
        if (!payload) {
            throw new AppError('Internal server error', HttpStatusCodes.INTERNAL_SERVER_ERROR);
        }
        return payload;
    } catch (error: any) {
        throw new AppError('Internal server error', HttpStatusCodes.BAD_GATEWAY);
    }
};
