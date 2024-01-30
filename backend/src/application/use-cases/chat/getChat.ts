import AppError from '@src/utils/appError';
import { chatDbInterface } from '../../../application/repositories/chatDBRepository';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import { usersDbInterface } from '@src/application/repositories/userDBRepository';

export const getChatHistoryUseCase = async (
    senderId: string,
    participantId: string,
    chatDbRepository: ReturnType<chatDbInterface>,
    userDbRepository: ReturnType<usersDbInterface>,
) => {
    if (!senderId && !participantId) {
        throw new AppError('User is required to get history', HttpStatusCodes.BAD_REQUEST);
    }
    const participant = await userDbRepository.getUserById(participantId);
    if (!participant) {
        throw new AppError('Participant is not found', HttpStatusCodes.BAD_REQUEST);
    }
    const currentUser = await userDbRepository.getUserById(senderId);
    if (!currentUser) {
        throw new AppError('User is not found', HttpStatusCodes.BAD_REQUEST);
    }
    const chatHistory = await chatDbRepository.chatHistory(currentUser._id, participant._id);
    if (chatHistory && participant) {
        console.log('chat history +woooooo');
        console.log(chatHistory);
        return { chatHistory, participant };
    }
};
