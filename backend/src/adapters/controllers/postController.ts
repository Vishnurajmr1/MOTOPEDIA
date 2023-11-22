import { PostDbRepositoryInterface } from '@src/application/repositories/postDBRepository';
import { CloudServiceInterface } from '@src/application/services/cloudServiceInterface';
import { addPosts } from '@src/application/use-cases/post/addPost';
import { deletePostById } from '@src/application/use-cases/post/deletePost';
import { editPostUseCase } from '@src/application/use-cases/post/editPost';
import { PostRepositoryMongoDbInterface } from '@src/frameworks/database/mongodb/repositories/postRepoMongoDb';
import { CloudServiceImpl } from '@src/frameworks/services/s3Service';
import { CustomRequest } from '@src/types/customRequest';
import { AddPostInterface, EditPostInterface } from '@src/types/postInterface';
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
        const userId = req.user?.Id;
        const response = await addPosts(userId, post, files, cloudService, dbRepositoryPost);
        console.log(response);
        res.status(201).json({
            status: 'success',
            message: 'Post added Successfully',
            data: response,
        });
    });

    const editPost = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
        const post: EditPostInterface = req.body;
        const files: Express.Multer.File[] = req.files as Express.Multer.File[];
        const userId = req.user?.Id;
        const postId: string = req.params.postId;
        const response = await editPostUseCase(userId, postId, files, post,cloudService, dbRepositoryPost);
        console.log(response);
        res.status(200).json({
            status:'success',
            message:'Successfully modified the post',
            data:response
        })
    });
    const deletePost=asyncHandler(async(req:CustomRequest,res:Response)=>{
        const userId=req.user?.Id;
        const postId:string=req.params.postId;
        await deletePostById(userId,postId,cloudService,dbRepositoryPost);
        res.status(200).json({
            status:'success',
            message:'Successfully deleted the post'
        })
    })
    return {
        addPost,
        editPost,
        deletePost
    };
};

export default postController;
