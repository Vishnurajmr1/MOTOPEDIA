import { ChatDbRepositoryInterface } from '../../../application/repositories/chatDBRepository';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';

export const getAllChatsUseCase = async (
    userId: string | undefined,
    chatDbRepository: ReturnType<ChatDbRepositoryInterface>,
) => {
    if (!userId) {
        throw new AppError('Please provide a valid userId', HttpStatusCodes.BAD_REQUEST);
    }
    const getAllChats = await chatDbRepository.getAllChats(userId);
    return getAllChats;
};
