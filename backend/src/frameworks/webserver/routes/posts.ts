import express from 'express';
import jwtAuthMiddleware from '../middlewares/userAuthMiddleware';
import { cloudServiceInterface } from '../../../application/services/cloudServiceInterface';
import postController from '../../../adapters/controllers/postController';
import { s3Service } from '../../../frameworks/services/s3Service';
import { postDbRepository } from '../../../application/repositories/postDBRepository';
import { postRepositoryMongoDb } from '../../../frameworks/database/mongodb/repositories/postRepoMongoDb';
import upload from '../middlewares/multer';
import { commentDbRepository } from '../../../application/repositories/commentDBRepository';
import { commentRepositoryMongoDb } from '../../../frameworks/database/mongodb/repositories/commentRepoMongoDb';
import { reportDbRepository } from '@src/application/repositories/reportDBRepoistory';
import { reportRepositoryMongoDb } from '@src/frameworks/database/mongodb/repositories/reportRepoMongoDb';

const postRouter = () => {
    const router = express.Router();
    const controller = postController(
        cloudServiceInterface,
        s3Service,
        postDbRepository,
        postRepositoryMongoDb,
        commentDbRepository,
        commentRepositoryMongoDb,
        reportDbRepository,
        reportRepositoryMongoDb
    );

    router.route('/get-all-posts').get(jwtAuthMiddleware, controller.getAllPosts);
    router.route('/').post(jwtAuthMiddleware, upload.array('files'), controller.addPost);
    router.route('/edit-post/:postId').put(jwtAuthMiddleware, upload.array('files'), controller.editPost);
    router.route('/delete-post/:postId').delete(jwtAuthMiddleware, controller.deletePost);
    router.route('/get-post-by-user').get(jwtAuthMiddleware, controller.getPostByUser);
    router.route('/like-post').put(jwtAuthMiddleware, controller.likePostById);
    router.route('/add-comment').post(jwtAuthMiddleware,controller.addCommentByPostId);
    router.route('/get-all-comments/:postId').get(jwtAuthMiddleware,controller.fetchCommentByPostId);
    router.route('/report/:postId').post(jwtAuthMiddleware,controller.reportPostById);
    router.route('/save-post/:postId').patch(jwtAuthMiddleware,controller.savePost);
    // router.route('/unlike-post').patch(jwtAuthMiddleware);
    return router;
};

export default postRouter;
