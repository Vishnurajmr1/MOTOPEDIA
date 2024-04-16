import { CommentDbRepositoryInterface } from '../../application/repositories/commentDBRepository';
import { PostDbRepositoryInterface } from '../../application/repositories/postDBRepository';
import { ReportDbRepositoryInterface } from '../../application/repositories/reportDBRepoistory';
import { CloudServiceInterface } from '../../application/services/cloudServiceInterface';
import { addComment } from '../../application/use-cases/comment/addComment';
import { getAllComments } from '../../application/use-cases/comment/getAllComments';
import { addPosts } from '../../application/use-cases/post/addPost';
import { deletePostById } from '../../application/use-cases/post/deletePost';
import { editPostUseCase, likePostUseCase } from '../../application/use-cases/post/editPost';
import {
    getAllPostsUseCase,
    getPostByUserUseCase,
    getPostsByFollowersUseCase,
} from '../../application/use-cases/post/listPost';
import { reportPost, reportPostUseCase } from '../../application/use-cases/post/reportPost';
import { getSavedPostsUseCase, savePostUseCase } from '../../application/use-cases/post/savePost';
import Status from '@src/constants/HttResponseStatus';
import { CommentRepositoryMongoDbInterface } from '../../frameworks/database/mongodb/repositories/commentRepoMongoDb';
import { PostRepositoryMongoDbInterface } from '../../frameworks/database/mongodb/repositories/postRepoMongoDb';
import { ReportRepositoryMongoDbInterface } from '../../frameworks/database/mongodb/repositories/reportRepoMongoDb';
import { CloudServiceImpl } from '../../frameworks/services/s3Service';
import { addCommentInterface } from '../../types/commentInterface';
import { CustomRequest } from '../../types/customRequest';
import { AddPostInterface, EditPostInterface } from '../../types/postInterface';
import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { ConnectionRepositoryMongoDB } from '../../frameworks/database/mongodb/repositories/connectionRepoMongoDb';
import { ConnectionDbRepositoryInterface } from '../../application/repositories/connectionDBRepository';

const postController = (
    cloudServiceInterface: CloudServiceInterface,
    cloudServiceImpl: CloudServiceImpl,
    postDbRepository: PostDbRepositoryInterface,
    postDbRepositoryImpl: PostRepositoryMongoDbInterface,
    commentDbRepository: CommentDbRepositoryInterface,
    commentDbRepositoryImpl: CommentRepositoryMongoDbInterface,
    reportDbRepository: ReportDbRepositoryInterface,
    reportDbRepositoryImpl: ReportRepositoryMongoDbInterface,
    connectionDbRepository: ConnectionDbRepositoryInterface,
    connectionDbRepositoryImpl: ConnectionRepositoryMongoDB,
) => {
    const dbRepositoryPost = postDbRepository(postDbRepositoryImpl());
    const cloudService = cloudServiceInterface(cloudServiceImpl());
    const dbRepositoryComment = commentDbRepository(commentDbRepositoryImpl());
    const dbRepositoryReport = reportDbRepository(reportDbRepositoryImpl());
    const dbRepositoryConnection = connectionDbRepository(connectionDbRepositoryImpl());
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
        console.log(post, postId);
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
        console.log(postId, userId);
        await deletePostById(userId, postId, cloudService, dbRepositoryPost);
        res.status(200).json({
            status: 'success',
            message: 'Successfully deleted the post',
            data:null
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
        const userId: string | undefined = (req.query?.Id as string) || req.user?.Id;
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
            data: {post,userId},
        });
    });
    const addCommentByPostId = asyncHandler(async (req: CustomRequest, res: Response) => {
        const userId: string | undefined = req.user?.Id;
        const { postId, content } = req.body;
        const commentInfo: addCommentInterface = { postId, userId, content };
        const comments = await addComment(userId, postId, commentInfo, dbRepositoryComment);
        res.status(201).json({
            status: Status.SUCCESS,
            message: 'comment added successfully',
            data:comments,
        });
    });
    const fetchCommentByPostId = asyncHandler(async (req: Request, res: Response) => {
        const postId = req.params.postId;
        const comments = await getAllComments(postId, dbRepositoryComment);
        res.status(200).json({
            status: Status.SUCCESS,
            message: 'Fetched all comments by postId',
            data:comments,
        });
    });
    const reportPostById = asyncHandler(async (req: CustomRequest, res: Response) => {
        const targetId = req.params.postId;
        const reporterId = req.user?.Id;
        const { reason, targetType } = req.body;
        const data = await reportPost({ reporterId, targetType, targetId, reason }, dbRepositoryReport);
        res.status(200).json({
            status: Status.SUCCESS,
            message: 'Post reported successfully',
            data,
        });
    });
    const getReportedPosts = asyncHandler(async (req: CustomRequest, res: Response) => {
        const data = await reportPostUseCase(dbRepositoryReport, dbRepositoryPost, cloudService);
        res.status(200).json({
            status: Status.SUCCESS,
            message: 'Fetched reported posts successfully',
            data: data || [],
        });
    });
    const savePost = asyncHandler(async (req: CustomRequest, res: Response) => {
        const postId = req.params.postId;
        const saveUserId = req.user?.Id;
        const data = await savePostUseCase(saveUserId, postId, dbRepositoryPost);
        res.status(200).json({
            status: Status.SUCCESS,
            message: 'Post saved successfully',
            data,
        });
    });
    const getSavedPosts = asyncHandler(async (req: CustomRequest, res: Response) => {
        const userId: string | undefined = req.user?.Id;
        const posts = await getSavedPostsUseCase(userId, dbRepositoryPost, cloudService);
        res.status(200).json({
            status: Status.SUCCESS,
            message: 'Successfully get all saved posts of current user',
            data: posts,
        });
    });
    const getPostsByFollowers = asyncHandler(async (req: CustomRequest, res: Response) => {
        const userId: string | undefined = req.user?.Id;
        const posts = await getPostsByFollowersUseCase(userId, cloudService, dbRepositoryPost, dbRepositoryConnection);
        res.status(200).json({
            status: Status.SUCCESS,
            message: 'Successfully fetched the posts of followers',
            data: posts,
        });
    });
    return {
        addPost,
        editPost,
        deletePost,
        getAllPosts,
        getPostByUser,
        likePostById,
        addCommentByPostId,
        fetchCommentByPostId,
        reportPostById,
        savePost,
        getSavedPosts,
        getPostsByFollowers,
        getReportedPosts,
    };
};

export default postController;
