import mongoose from 'mongoose';
import { IAddNotification, IEditNotification } from '../../../../types/notification.interface';
import Notification from '../models/notification.Model';

export const notificationRepositoryMongoDb = () => {
    const addNotification = async (addNotification: IAddNotification) => {
        const newNotification = new Notification(addNotification);
        const notification = await newNotification.save();
        return notification;
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
                    sender: new mongoose.Types.ObjectId(notification.sender),
                    recipient: notification.recipient,
                    postId: new mongoose.Types.ObjectId(notification.postId),
                    actionType: notification.actionType,
                },
            },
        ]);
        if (existingNotification.length) {
            return existingNotification[0];
        }
    };
    const updateNotification = async (notificationId: string, data: IEditNotification) => {
        const response = await Notification.findByIdAndUpdate({ _id: notificationId }, { ...data }, { new: true });
        return response;
    };
    const updateNotificationAsRead = async (recipient: string) => {
        const response = await Notification.updateMany(
            { recipient: recipient, readBy: false },
            { $set: { readBy: true } },
        );
        return response;
    };

    return {
        addNotification,
        getAllNotifications,
        checkExisitingNotification,
        updateNotification,
        updateNotificationAsRead,
    };
};

export type NotificationRepositoryMongoDb = typeof notificationRepositoryMongoDb;
