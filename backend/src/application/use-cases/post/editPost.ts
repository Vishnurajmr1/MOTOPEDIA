import { PostDbRepositoryInterface } from '@src/application/repositories/postDBRepository';
import { CloudServiceInterface } from '@src/application/services/cloudServiceInterface';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { CloudServiceImpl } from '@src/frameworks/services/s3Service';
import { EditPostInterface, postInterface } from '@src/types/postInterface';
import AppError from '@src/utils/appError';
import { Return } from 'aws-sdk/clients/cloudsearchdomain';

export const editPostUseCase = async (
    userId: string | undefined,
    postId: string,
    files: Express.Multer.File[],
    postInfo: EditPostInterface,
    cloudService: ReturnType<CloudServiceInterface>,
    postDbRepository: ReturnType<PostDbRepositoryInterface>,
) => {
    let isImageUpdated = false;
    if (!postId) {
        throw new AppError('Please provide a post id', HttpStatusCodes.BAD_REQUEST);
    }
    if (!userId) {
        throw new AppError('unable to get userId', HttpStatusCodes.FORBIDDEN);
    }
    if (!postInfo) {
        throw new AppError('Please provide post details', HttpStatusCodes.BAD_REQUEST);
    }
    const oldPost = await postDbRepository.getPostById(postId);
    if (oldPost?.authorId.toString() !== userId) {
        throw new AppError('You have no permission to edit this post', HttpStatusCodes.FORBIDDEN);
    }
    if (files && files.length > 0) {
        const uploadPromises = files.map(async (file) => {
            const image = await cloudService.upload(file, 'Posts/photo');
            postInfo.image = image;
            isImageUpdated = true;
        });

        await Promise.all(uploadPromises);
    }
    postInfo.authorId = userId;
    const response = await postDbRepository.editPost(postId, postInfo);

    if (response) {
        if (isImageUpdated && oldPost?.image) {
            await cloudService.removeFile(oldPost.image.key);
        }
    }
};

export const likePostUseCase = async (
    userId: string | undefined,
    postId: string,
    reactionType: string,
    postDbRepository: ReturnType<PostDbRepositoryInterface>,
) => {
    if (!postId) {
        throw new AppError('Please provide a post id', HttpStatusCodes.BAD_REQUEST);
    }
    if (!userId) {
        throw new AppError('unable to get userId', HttpStatusCodes.FORBIDDEN);
    }
    if (!reactionType) {
        throw new AppError('Please provide a reaction type', HttpStatusCodes.BAD_REQUEST);
    }
    const oldPost = await postDbRepository.getPostById(postId);
    if (!oldPost) {
        throw new AppError('Unable to get post details', HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
    let postInfo: EditPostInterface = {
        likedBy: [{userId:'',reactionType:''}],
        likes: { like: 0, thumbsUp: 0, heart: 0 },
    };
    
    console.log(oldPost);
    console.log('Hello old post to new post');
    if (userId && reactionType) {
        console.log(userId,reactionType)
        postInfo.likedBy?.push({ userId, reactionType });
    }
    if (reactionType == 'like') {
        postInfo.likes?.like != (postInfo.likes?.like || 0) + 1;
    }
    const response = await postDbRepository.editPost(postId, postInfo);
    console.log(response);
};
