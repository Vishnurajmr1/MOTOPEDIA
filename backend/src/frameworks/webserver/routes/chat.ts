import express from 'express';
import chatController from '../../../adapters/controllers/chatController';
import jwtAuthMiddleware from '../middlewares/userAuthMiddleware';
import { chatDbRepository } from '../../../application/repositories/chatDBRepository';
import { chatRepositoryMongoDB } from '../../../frameworks/database/mongodb/repositories/chatRepoMongoDb';
import { userDbRepository } from '../../../application/repositories/userDBRepository';
import { userRepositoryMongoDB } from '../../../frameworks/database/mongodb/repositories/UserRepoMongoDb';

const chatRouter = () => {
    const router = express.Router();
    const controller = chatController(chatDbRepository, chatRepositoryMongoDB, userDbRepository, userRepositoryMongoDB);
    router.use(jwtAuthMiddleware);
    router.route('/').get(controller.getAllChats);
    router.route('/c/:receiverId').post(controller.createChat);
    return router;
};

export default chatRouter;
