import { IAddNotification } from '../../../../types/notification.interface';
import Notification from '../models/notification.Model';

export const notificationRepositoryMongoDb = () => {
    const addNotification = async (addNotification: IAddNotification) => {
        const newNotification = new Notification(addNotification);
        const notification = await newNotification.save();
        return notification;
    };

    const getAllNotifications = async (recipientId: string) => {
        const notifications = await Notification.find({ recipient: recipientId }).sort({createdAt:-1});
        return notifications;
    };

    return {
        addNotification,
        getAllNotifications
    };
};

export type NotificationRepositoryMongoDb = typeof notificationRepositoryMongoDb;
