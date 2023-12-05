import express from 'express';
import jwtAuthMiddleware from '../middlewares/userAuthMiddleware';
import { cloudServiceInterface } from '@src/application/services/cloudServiceInterface';
import postController from '@src/adapters/controllers/postController';
import { s3Service } from '@src/frameworks/services/s3Service';
import { postDbRepository } from '@src/application/repositories/postDBRepository';
import { postRepositoryMongoDb } from '@src/frameworks/database/mongodb/repositories/postRepoMongoDb';
import upload from '../middlewares/multer';
import { commentDbRepository } from '@src/application/repositories/commentDBRepository';
import { commentRepositoryMongoDb } from '@src/frameworks/database/mongodb/repositories/commentRepoMongoDb';

const postRouter = () => {
    const router = express.Router();
    const controller = postController(
        cloudServiceInterface,
        s3Service,
        postDbRepository,
        postRepositoryMongoDb,
        commentDbRepository,
        commentRepositoryMongoDb,
    );

    router.route('/get-all-posts').get(jwtAuthMiddleware, controller.getAllPosts);
    router.route('/').post(jwtAuthMiddleware, upload.array('files'), controller.addPost);
    router.route('/edit-post/:postId').put(jwtAuthMiddleware, upload.array('files'), controller.editPost);
    router.route('/delete-post/:postId').delete(jwtAuthMiddleware, controller.deletePost);
    router.route('/get-post-by-user').get(jwtAuthMiddleware, controller.getPostByUser);
    router.route('/like-post').put(jwtAuthMiddleware, controller.likePostById);
    router.route('/add-comment').post(jwtAuthMiddleware,controller.addCommentByPostId);
    // router.route('/unlike-post').patch(jwtAuthMiddleware);
    return router;
};

export default postRouter;
