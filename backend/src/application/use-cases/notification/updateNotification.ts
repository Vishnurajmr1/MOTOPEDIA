import { notificationDbRepositoryInterface } from '../../../application/repositories/notificationDBRepository';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';

export const updateNotificationUseCase = async (
    recipient: string,
    notificationDbRepository: ReturnType<notificationDbRepositoryInterface>,
) => {
    try {
        if (!recipient) {
            throw new AppError('Please provide a proper id', HttpStatusCodes.BAD_REQUEST);
        }
        const payload = await notificationDbRepository.updateAllNotification(recipient);
        return payload;
    } catch (error) {
        throw new AppError('Internal server error', HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
};
