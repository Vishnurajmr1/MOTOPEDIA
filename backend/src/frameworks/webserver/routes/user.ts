import userController from '@src/adapters/controllers/userController';
import { userDbRepository } from '@src/application/repositories/userDBRepository';
import { authService } from '@src/frameworks/services/authService';
import express from 'express';
import jwtAuthMiddleware from '../middlewares/userAuthMiddleware';
import { authServiceInterface } from '@src/application/services/authServicesInterface';
import { userRepositoryMongoDB } from '@src/frameworks/database/mongodb/repositories/UserRepoMongoDb';
import roleCheckMiddleware from '../middlewares/roleCheckMiddleware';

const userRouter = () => {
    const router = express.Router();
    const controller = userController(authServiceInterface, authService, userDbRepository, userRepositoryMongoDB);
    router.get('/get-all-users', jwtAuthMiddleware, controller.getAllUsers);
    router.patch('/block-user/:userId', jwtAuthMiddleware, roleCheckMiddleware('admin'), controller.blockUser);
    router.patch('/unblock-user/:userId', jwtAuthMiddleware, roleCheckMiddleware('admin'), controller.unblockUser);
    return router;
};

export default userRouter;
