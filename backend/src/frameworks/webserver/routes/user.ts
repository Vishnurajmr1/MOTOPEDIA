import userController from '../../../adapters/controllers/userController';
import { userDbRepository } from '../../../application/repositories/userDBRepository';
import { authService } from '../../../frameworks/services/authService';
import express from 'express';
import jwtAuthMiddleware from '../middlewares/userAuthMiddleware';
import { authServiceInterface } from '../../../application/services/authServicesInterface';
import { userRepositoryMongoDB } from '../../../frameworks/database/mongodb/repositories/UserRepoMongoDb';
import roleCheckMiddleware from '../middlewares/roleCheckMiddleware';
import { connectionDbRepository } from '../../../application/repositories/connectionDBRepository';
import { connectionRepositoryMongoDB } from '../../../frameworks/database/mongodb/repositories/connectionRepoMongoDb';
import { cloudServiceInterface } from '../../../application/services/cloudServiceInterface';
import { s3Service } from '../../../frameworks/services/s3Service';
import upload from '../middlewares/multer';

const userRouter = () => {
    const router = express.Router();
    const controller = userController(
        authServiceInterface,
        authService,
        userDbRepository,
        userRepositoryMongoDB,
        connectionDbRepository,
        connectionRepositoryMongoDB,
        cloudServiceInterface,
        s3Service,
    );
    router.get('/get-all-users', jwtAuthMiddleware, controller.getAllUsers);
    router.patch('/block-user/:userId', jwtAuthMiddleware, roleCheckMiddleware('admin'), controller.blockUser);
    router.patch('/unblock-user/:userId', jwtAuthMiddleware, roleCheckMiddleware('admin'), controller.unblockUser);
    router.route('/get-user-details').get(jwtAuthMiddleware, controller.getUserDetails);
    router.route('/follow/:id').post(jwtAuthMiddleware, controller.followUser);
    router.route('/unfollow/:id').post(jwtAuthMiddleware, controller.unfollowUser);
    router.route('/connection').get(jwtAuthMiddleware, controller.getConnections);
    router.route('/get-user/:id').get(jwtAuthMiddleware, controller.getOtherUserDetails);
    router.route('/update-profile').put(jwtAuthMiddleware, upload.single('image'), controller.editUserDetails);
    router.route('/search-user').get(jwtAuthMiddleware, controller.searchUser);
    router.route('/profile-pic').patch(jwtAuthMiddleware, upload.single('image'), controller.editUserDetails);
    router.route('/users').get(jwtAuthMiddleware, controller.searchAvailableUsers);
    return router;
};

export default userRouter;
