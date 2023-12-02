import userController from '@src/adapters/controllers/userController';
import { userDbRepository } from '@src/application/repositories/userDBRepository';
import { authService } from '@src/frameworks/services/authService';
import express from 'express';
import jwtAuthMiddleware from '../middlewares/userAuthMiddleware';
import { authServiceInterface } from '@src/application/services/authServicesInterface';
import { userRepositoryMongoDB } from '@src/frameworks/database/mongodb/repositories/UserRepoMongoDb';
import roleCheckMiddleware from '../middlewares/roleCheckMiddleware';
import { connectionDbRepository } from '@src/application/repositories/connectionDBRepository';
import { connectionRepositoryMongoDB } from '@src/frameworks/database/mongodb/repositories/connectionRepoMongoDb';

const userRouter = () => {
    const router = express.Router();
    const controller = userController(
        authServiceInterface,
        authService,
        userDbRepository,
        userRepositoryMongoDB,
        connectionDbRepository,
        connectionRepositoryMongoDB,
    );
    router.get('/get-all-users', jwtAuthMiddleware, controller.getAllUsers);
    router.patch('/block-user/:userId', jwtAuthMiddleware, roleCheckMiddleware('admin'), controller.blockUser);
    router.patch('/unblock-user/:userId', jwtAuthMiddleware, roleCheckMiddleware('admin'), controller.unblockUser);
    router.route('/get-user-details').get(jwtAuthMiddleware, controller.getUserDetails);
    router.route('/follow/:id').post(jwtAuthMiddleware, controller.followUser);
    router.route('/unfollow/:id').post(jwtAuthMiddleware, controller.unfollowUser);
    return router;
};

export default userRouter;
