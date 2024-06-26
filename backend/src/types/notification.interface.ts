import { NotificationActionType } from './common';

export interface IAddNotification {
    sender: string;
    recipient: string;
    postId: string;
    message: string;
    read: boolean;
    actionType: NotificationActionType;
}

export interface IEditNotification {
    message?: string;
    read?: boolean;
}
