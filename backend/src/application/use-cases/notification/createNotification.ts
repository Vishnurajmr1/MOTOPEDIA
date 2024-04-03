import { notificationDbRepositoryInterface } from '@src/application/repositories/notificationDBRepository';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';
import { usersDbInterface } from '@src/application/repositories/userDBRepository';
import { PostDbRepositoryInterface } from '@src/application/repositories/postDBRepository';
import { IAddNotification } from '@src/types/notification.interface';
import { NotificationActionType } from '@src/types/common';
import { postInterface } from '@src/types/postInterface';

export const createNotificationUseCase = async (
    senderId: string,
    notificationData: IAddNotification,
    notificationDbRepository: ReturnType<notificationDbRepositoryInterface>,
    userDbRepository: ReturnType<usersDbInterface>,
    postDbRepository: ReturnType<PostDbRepositoryInterface>,
) => {
    try {
        if (!senderId || !notificationData) {
            throw new AppError('Invalid input data', HttpStatusCodes.BAD_REQUEST);
        }
        notificationData.sender = senderId;
        const user = await userDbRepository.getUserById(senderId);
        let post: postInterface | null = null;
        const { postId, actionType } = notificationData;
        if (notificationData.postId) {
            post = await postDbRepository.getPostById(postId);
        }
        switch (actionType) {
            case NotificationActionType.LIKE:
                if (post) {
                    notificationData.recipient = post?.authorId || '';
                    notificationData.message = `${user?.firstName} Liked your "${post?.title}" post.`;
                }
                break;
            case NotificationActionType.COMMENT:
                if (post) {
                    notificationData.recipient = post.authorId;
                    notificationData.message = `${user?.firstName} commented  on your "${post.title}".`;
                }
                break;
            default:
                throw new AppError('Unsupported action type', HttpStatusCodes.BAD_REQUEST);
        }
        const payload = await notificationDbRepository.addNotification(notificationData);
        console.log(payload);
        return payload;
    } catch (error) {
        throw new AppError('Internal server error', HttpStatusCodes.BAD_GATEWAY);
    }
};
