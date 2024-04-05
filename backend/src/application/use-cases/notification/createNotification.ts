import { notificationDbRepositoryInterface } from '../../../application/repositories/notificationDBRepository';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';
import { usersDbInterface } from '../../../application/repositories/userDBRepository';
import { PostDbRepositoryInterface } from '../../../application/repositories/postDBRepository';
import { IAddNotification } from '../../../types/notification.interface';
import { NotificationActionType } from '../../../types/common';
import { postInterface } from '../../../types/postInterface';

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
            notificationData.recipient = post?.authorId as string;
        }
        console.log('It is the notification data');
        console.log(notificationData);
        console.log('It is the notification data output');
        const existingNotification = await notificationDbRepository.checkExisitingNotification(notificationData);
        console.log(existingNotification);
        if (existingNotification) {
            console.log('hello');
            console.log(existingNotification);
            if (actionType == NotificationActionType.LIKE) {
            }
        } else {
            switch (actionType) {
                case NotificationActionType.LIKE:
                    if (post) {
                        notificationData.message = `${user?.firstName} Liked your "${post?.title}" post.`;
                    }
                    break;
                case NotificationActionType.COMMENT:
                    if (post) {
                        notificationData.message = `${user?.firstName} commented  on your "${post.title}".`;
                    }
                    break;
                default:
                    throw new AppError('Unsupported action type', HttpStatusCodes.BAD_REQUEST);
            }
        }

        const payload = await notificationDbRepository.addNotification(notificationData);
        console.log(payload);
        return payload;
    } catch (error) {
        throw new AppError('Internal server error', HttpStatusCodes.BAD_GATEWAY);
    }
};
