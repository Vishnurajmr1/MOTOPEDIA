import { notificationDbRepositoryInterface } from '../../../application/repositories/notificationDBRepository';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';

export const getAllNotificationsUseCase = async (
    recipientId: string,
    notificationDbRepository: ReturnType<notificationDbRepositoryInterface>,
) => {
    try {
        if (!recipientId) {
            throw new AppError('Please provide the userId', HttpStatusCodes.BAD_REQUEST);
        }
        const payload = await notificationDbRepository.getAllNotifications(recipientId);
        return payload;
    } catch (error) {
        throw new AppError('Internal server error', HttpStatusCodes.BAD_GATEWAY);
    }
};
