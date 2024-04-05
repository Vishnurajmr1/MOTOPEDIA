import { NotificationRepositoryMongoDb } from '../../frameworks/database/mongodb/repositories/notificationRepoMongoDb';
import { IAddNotification, IEditNotification } from '../../types/notification.interface';

export const notificationDbRepository = (repository: ReturnType<NotificationRepositoryMongoDb>) => {
    const addNotification = async (notification: IAddNotification) => await repository.addNotification(notification);
    const getAllNotifications = async (recipiendId: string) => await repository.getAllNotifications(recipiendId);
    const checkExisitingNotification = async (notification: IAddNotification) =>
        await repository.checkExisitingNotification(notification);
    const updateNotification = async (notificationId: string, notification: IEditNotification) =>
        await repository.updateNotification(notificationId, notification);
    const updateAllNotification = async (recipient: string) => await repository.updateNotificationAsRead(recipient);
    return {
        addNotification,
        getAllNotifications,
        checkExisitingNotification,
        updateNotification,
        updateAllNotification
    };
};

export type notificationDbRepositoryInterface = typeof notificationDbRepository;
