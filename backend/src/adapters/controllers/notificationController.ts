import { CustomRequest } from '../../types/customRequest';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import Status from '../../constants/HttResponseStatus';
import { usersDbInterface } from '../../application/repositories/userDBRepository';
import { UserRepositoryMongoDB } from '../../frameworks/database/mongodb/repositories/UserRepoMongoDb';
import { ConnectionDbRepositoryInterface } from '../../application/repositories/connectionDBRepository';
import { ConnectionRepositoryMongoDB } from '../../frameworks/database/mongodb/repositories/connectionRepoMongoDb';
import { PostDbRepositoryInterface } from '../../application/repositories/postDBRepository';
import { PostRepositoryMongoDbInterface } from '../../frameworks/database/mongodb/repositories/postRepoMongoDb';
import { notificationDbRepositoryInterface } from '../../application/repositories/notificationDBRepository';
import { NotificationRepositoryMongoDb } from '../../frameworks/database/mongodb/repositories/notificationRepoMongoDb';
import { IAddNotification } from '../../types/notification.interface';
import { createNotificationUseCase } from '../../application/use-cases/notification/createNotification';
import { emitSocketEvent } from '../../frameworks/websocket/socket';
import { ChatEventEnum } from '../../constants/chatEventEnum';
import { getAllNotificationsUseCase } from '../../application/use-cases/notification/getAllNotification';
import { updateNotificationUseCase } from '../../application/use-cases/notification/updateNotification';
const notificationController = (
    userDbRepository: usersDbInterface,
    userDbRepositoryImplementation: UserRepositoryMongoDB,
    connectionDbRepository: ConnectionDbRepositoryInterface,
    connectionDbRepositoryImplementation: ConnectionRepositoryMongoDB,
    postDbRepository: PostDbRepositoryInterface,
    postDbRepositoryImplementation: PostRepositoryMongoDbInterface,
    notificationDbRepository: notificationDbRepositoryInterface,
    notificationDbRepositoryImplementaiton: NotificationRepositoryMongoDb,
) => {
    const dbRepositoryUser = userDbRepository(userDbRepositoryImplementation());
    const dbRepositoryPost = postDbRepository(postDbRepositoryImplementation());
    const dbRepositoryConnection = connectionDbRepository(connectionDbRepositoryImplementation());
    const dbRepositoryNotification = notificationDbRepository(notificationDbRepositoryImplementaiton());
    const createNotification = asyncHandler(async (req: CustomRequest, res: Response) => {
        const senderId = req.user?.Id as string;
        const notificationData: IAddNotification = req.body;
        const result = await createNotificationUseCase(
            senderId,
            notificationData,
            dbRepositoryNotification,
            dbRepositoryUser,
            dbRepositoryPost,
        );
        if (result.recipient) {
            emitSocketEvent(req, result.recipient._id.toString(), ChatEventEnum.NOTIFICATION_RECEIVED_EVENT, result);
        }
        res.status(200).json({
            status: Status.SUCCESS,
            message: 'Successfully created a notification',
            data: result,
        });
    });
    const getAllNotifications = asyncHandler(async (req: CustomRequest, res: Response) => {
        const recipientId = req.user?.Id as string;
        const result = await getAllNotificationsUseCase(recipientId, dbRepositoryNotification);
        res.status(200).json({
            status: Status.SUCCESS,
            message: 'Successfully get all notifications',
            data: result,
        });
    });
    const updateAllNotification = asyncHandler(async (req: CustomRequest, res: Response) => {
        const recipientId = req.user?.Id as string;
        const result = await updateNotificationUseCase(recipientId, dbRepositoryNotification);
        res.status(200).json({
            status: Status.SUCCESS,
            message: 'Successfully updated the notification',
            data: result,
        });
    });
    return {
        createNotification,
        getAllNotifications,
        updateAllNotification,
    };
};

export default notificationController;
