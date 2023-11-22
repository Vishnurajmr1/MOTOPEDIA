import express from 'express';
import jwtAuthMiddleware from '../middlewares/userAuthMiddleware';
import { cloudServiceInterface } from '@src/application/services/cloudServiceInterface';
import postController from '@src/adapters/controllers/postController';
import { s3Service } from '@src/frameworks/services/s3Service';
import { postDbRepository } from '@src/application/repositories/postDBRepository';
import { postRepositoryMongoDb } from '@src/frameworks/database/mongodb/repositories/postRepoMongoDb';
import upload from '../middlewares/multer';

const postRouter = () => {
    const router = express.Router();
    const controller = postController(cloudServiceInterface, s3Service, postDbRepository, postRepositoryMongoDb);

    router.get('/get-all-posts', jwtAuthMiddleware);
    router.post('/', jwtAuthMiddleware, upload.array('files'), controller.addPost);
    router.put('/edit-post/:postId', jwtAuthMiddleware, upload.array('files'), controller.editPost);
    router.delete('/delete-post/:postId', jwtAuthMiddleware,controller.deletePost);
    return router;
};

export default postRouter;