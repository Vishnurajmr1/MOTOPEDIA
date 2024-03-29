import { PostDbRepositoryInterface } from '@src/application/repositories/postDBRepository';
import { CloudServiceInterface } from '@src/application/services/cloudServiceInterface';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { CloudServiceImpl } from '@src/frameworks/services/s3Service';
import { EditPostInterface } from '@src/types/postInterface';
import AppError from '@src/utils/appError';

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
    // if (oldPost?.authorId.toString() !== userId) {
    //     throw new AppError('You have no permission to edit this post', HttpStatusCodes.FORBIDDEN);
    // }
    if (files && files.length > 0) {
        const uploadPromises = files.map(async (file) => {
            const image = await cloudService.upload(file, 'Posts/photo');
            postInfo.image = image;
            isImageUpdated = true;
        });

        await Promise.all(uploadPromises);
    }
    if (oldPost?.authorId.toString() === userId) {
        postInfo.authorId = userId;
    }
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
        likedBy: [{ userId: '', reactionType: '' }],
        likes: { like: oldPost.likes?.like, thumbsUp: oldPost.likes?.thumbsUp, heart: oldPost.likes?.heart },
    };

    if (oldPost.likedBy) {
        postInfo.likedBy = [...oldPost.likedBy];
    }
    if (userId && reactionType) {
        const existingReactionIndex: number = postInfo.likedBy!.findIndex((item) => item.userId.toString() == userId);
        const existingReaction = postInfo.likedBy!.find((item) => item.userId.toString() == userId);
        if (existingReactionIndex == -1) {
            postInfo.likedBy?.push({ userId, reactionType });
            if (reactionType == 'like') {
                postInfo.likes!.like = (oldPost.likes?.like || 0) + 1;
            }
        } else {
            postInfo.likedBy!.splice(existingReactionIndex, 1);
            if (existingReaction?.reactionType == 'like') {
                postInfo.likes!.like = (oldPost.likes?.like || 0) - 1;
            }
        }
    }
    const response = await postDbRepository.editPost(postId, postInfo);
    return response;
};
