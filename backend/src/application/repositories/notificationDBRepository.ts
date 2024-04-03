import { NotificationRepositoryMongoDb } from '../../frameworks/database/mongodb/repositories/notificationRepoMongoDb';
import { IAddNotification } from '../../types/notification.interface';

export const notificationDbRepository = (repository: ReturnType<NotificationRepositoryMongoDb>) => {
    const addNotification = async (notification: IAddNotification) => await repository.addNotification(notification);
    const getAllNotifications=async(recipiendId:string)=>await repository.getAllNotifications(recipiendId);
    return {
        addNotification,
        getAllNotifications
    };
};

export type notificationDbRepositoryInterface = typeof notificationDbRepository;
