import express from 'express';
import jwtAuthMiddleware from '../middlewares/userAuthMiddleware';
import { userDbRepository } from '../../../application/repositories/userDBRepository';
import { userRepositoryMongoDB } from '../../../frameworks/database/mongodb/repositories/UserRepoMongoDb';
import { connectionDbRepository } from '../../../application/repositories/connectionDBRepository';
import { connectionRepositoryMongoDB } from '../../../frameworks/database/mongodb/repositories/connectionRepoMongoDb';
import { postDbRepository } from '../../../application/repositories/postDBRepository';
import { postRepositoryMongoDb } from '../../../frameworks/database/mongodb/repositories/postRepoMongoDb';
import { notificationDbRepository } from '../../../application/repositories/notificationDBRepository';
import { notificationRepositoryMongoDb } from '../../../frameworks/database/mongodb/repositories/notificationRepoMongoDb';
import notificationController from '../../../adapters/controllers/notificationController';

const notificationRouter = () => {
    const router = express.Router();
    const controller = notificationController(
        userDbRepository,
        userRepositoryMongoDB,
        connectionDbRepository,
        connectionRepositoryMongoDB,
        postDbRepository,
        postRepositoryMongoDb,
        notificationDbRepository,
        notificationRepositoryMongoDb,
    );
    router.use(jwtAuthMiddleware);
    router.route('/create').post(controller.createNotification);
    router.route('/').get(controller.getAllNotifications);
    return router;
};
export default notificationRouter;
