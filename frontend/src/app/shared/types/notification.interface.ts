import { NotificationActionType } from '.';

export interface IAddNotification {
  recipient: string;
  postId: string;
  actionType: NotificationActionType;
}

export interface NotificationInterface {
  sender: string;
  _id: string;
  recipient: string;
  postId: string;
  message: string;
  readBy: boolean;
  actionType: NotificationActionType;
  createdAt: string;
  updatedAt: string;
}
