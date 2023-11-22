import { PostDbRepositoryInterface } from '@src/application/repositories/postDBRepository';
import { CloudServiceInterface } from '@src/application/services/cloudServiceInterface';
import { addPosts } from '@src/application/use-cases/post/addPost';
import { PostRepositoryMongoDbInterface } from '@src/frameworks/database/mongodb/repositories/postRepoMongoDb';
import { CloudServiceImpl } from '@src/frameworks/services/s3Service';
import { CustomRequest } from '@src/types/customRequest';
import { AddPostInterface } from '@src/types/postInterface';
import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';

const postController = (
    cloudServiceInterface: CloudServiceInterface,
    cloudServiceImpl: CloudServiceImpl,
    postDbRepository: PostDbRepositoryInterface,
    postDbRepositoryImpl: PostRepositoryMongoDbInterface,
) => {
    const dbRepositoryPost = postDbRepository(postDbRepositoryImpl());
    const cloudService = cloudServiceInterface(cloudServiceImpl());
    const addPost = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
        const post: AddPostInterface = req.body;
        const files: Express.Multer.File[] = req.files as Express.Multer.File[];
        const authorId = req.user?.Id;
        const response = await addPosts(authorId, post, files, cloudService, dbRepositoryPost);
        console.log(response);
        res.status(201).json({
            status: 'success',
            message: 'Post added Successfully',
            data: response,
        });
    });
    return {
        addPost,
    };
};

export default postController;
