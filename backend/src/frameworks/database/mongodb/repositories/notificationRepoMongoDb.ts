import { IAddNotification, IEditNotification } from '../../../../types/notification.interface';
import Notification from '../models/notification.Model';

export const notificationRepositoryMongoDb = () => {
    const addNotification = async (addNotification: IAddNotification) => {
        const newNotification = new Notification(addNotification);
        const notification = await newNotification.save();
        return notification[0];
    };

    const getAllNotifications = async (recipientId: string) => {
        const notifications = await Notification.find({ recipient: recipientId })
            .sort({ createdAt: -1 })
            .populate('sender');
        return notifications;
    };
    const checkExisitingNotification = async (notification: IAddNotification) => {
        const existingNotification = await Notification.aggregate([
            {
                $match: {
                    sender: notification.sender,
                    recipient: notification.recipient,
                    postId: notification.postId,
                    actionType: notification.actionType,
                },
            },
        ]);
        if (existingNotification.length) {
            return existingNotification;
        }
    };
    const updateNotification = async (recipiendId: string, data: IEditNotification) => {
        const response = await Notification.updateMany({ recipient: recipiendId }, { ...data }, { new: true });
        return response;
    };

    return {
        addNotification,
        getAllNotifications,
        checkExisitingNotification,
        updateNotification,
    };
};

export type NotificationRepositoryMongoDb = typeof notificationRepositoryMongoDb;
