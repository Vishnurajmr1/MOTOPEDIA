import { CommentDbRepositoryInterface } from '@src/application/repositories/commentDBRepository';
import { PostDbRepositoryInterface } from '@src/application/repositories/postDBRepository';
import { CloudServiceInterface } from '@src/application/services/cloudServiceInterface';
import { addComment } from '@src/application/use-cases/comment/addComment';
import { getAllComments } from '@src/application/use-cases/comment/getAllComments';
import { addPosts } from '@src/application/use-cases/post/addPost';
import { deletePostById } from '@src/application/use-cases/post/deletePost';
import { editPostUseCase, likePostUseCase } from '@src/application/use-cases/post/editPost';
import { getAllPostsUseCase, getPostByUserUseCase } from '@src/application/use-cases/post/listPost';
import Status from '@src/constants/HttResponseStatus';
import { CommentRepositoryMongoDbInterface } from '@src/frameworks/database/mongodb/repositories/commentRepoMongoDb';
import { PostRepositoryMongoDbInterface } from '@src/frameworks/database/mongodb/repositories/postRepoMongoDb';
import { CloudServiceImpl } from '@src/frameworks/services/s3Service';
import { addCommentInterface } from '@src/types/commentInterface';
import { CustomRequest } from '@src/types/customRequest';
import { AddPostInterface, EditPostInterface } from '@src/types/postInterface';
import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';

const postController = (
    cloudServiceInterface: CloudServiceInterface,
    cloudServiceImpl: CloudServiceImpl,
    postDbRepository: PostDbRepositoryInterface,
    postDbRepositoryImpl: PostRepositoryMongoDbInterface,
    commentDbRepository: CommentDbRepositoryInterface,
    commentDbRepositoryImpl: CommentRepositoryMongoDbInterface,
) => {
    const dbRepositoryPost = postDbRepository(postDbRepositoryImpl());
    const cloudService = cloudServiceInterface(cloudServiceImpl());
    const dbRepositoryComment = commentDbRepository(commentDbRepositoryImpl());
    const addPost = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
        const post: AddPostInterface = req.body;
        const files: Express.Multer.File[] = req.files as Express.Multer.File[];
        const userId = req.user?.Id;
        const response = await addPosts(userId, post, files, cloudService, dbRepositoryPost);
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
        const response = await editPostUseCase(userId, postId, files, post, cloudService, dbRepositoryPost);
        res.status(200).json({
            status: 'success',
            message: 'Successfully modified the post',
            data: response,
        });
    });
    const deletePost = asyncHandler(async (req: CustomRequest, res: Response) => {
        const userId = req.user?.Id;
        const postId: string = req.params.postId;
        console.log(postId,userId)
        await deletePostById(userId, postId, cloudService, dbRepositoryPost);
        res.status(200).json({
            status: 'success',
            message: 'Successfully deleted the post',
        });
    });
    const getAllPosts = asyncHandler(async (req: Request, res: Response) => {
        const posts = await getAllPostsUseCase(cloudService, dbRepositoryPost);
        res.status(200).json({
            status: Status.SUCCESS,
            message: 'Successfully retrieved all posts',
            data: posts,
        });
    });
    const getPostByUser = asyncHandler(async (req: CustomRequest, res: Response) => {
        const userId: string | undefined = req.user?.Id;
        const posts = await getPostByUserUseCase(userId, cloudService, dbRepositoryPost);
        res.status(200).json({
            status: Status.SUCCESS,
            message: 'Successfully get post by current user',
            data: posts,
        });
    });
    const likePostById = asyncHandler(async (req: CustomRequest, res: Response) => {
        const userId: string | undefined = req.user?.Id;
        const { postId, reactionType }: { postId: string; reactionType: string } = req.body;
        const post = await likePostUseCase(userId, postId, reactionType, dbRepositoryPost);
        res.status(200).json({
            status: Status.SUCCESS,
            message: 'Successfully modified  the post',
            data: post,
            userId
        });
    });
    const addCommentByPostId=asyncHandler(async(req:CustomRequest,res:Response)=>{
        const userId:string|undefined=req.user?.Id;
        const {postId,content}=req.body;
        const commentInfo:addCommentInterface={postId,userId,content};
        const comments=await addComment(userId,postId,commentInfo,dbRepositoryComment);
        res.status(201).json({
            status:Status.SUCCESS,
            message:'comment added successfully',
            comments
        })
    })
    const fetchCommentByPostId=asyncHandler(async(req:Request,res:Response)=>{
        const postId=req.params.postId;
        const comments=await getAllComments(postId,dbRepositoryComment);
        res.status(200).json({
            status:Status.SUCCESS,
            message:'Fetched all comments by postId',
            comments
        })
    })
    const reportPostById=asyncHandler(async(req:Request,res:Response)=>{
        const postId=req.params.postId;
    })
    const savePostByuserId=asyncHandler(async(req:Request,res:Response)=>{
        
    })
    return {
        addPost,
        editPost,
        deletePost,
        getAllPosts,
        getPostByUser,
        likePostById,
        addCommentByPostId,
        fetchCommentByPostId
    };
};

export default postController;
