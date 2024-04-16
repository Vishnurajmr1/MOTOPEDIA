import { PostDbRepositoryInterface } from '../../../application/repositories/postDBRepository';
import { CloudServiceInterface } from '../../../application/services/cloudServiceInterface';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';

export const deletePostById = async (
    userId: string | undefined,
    postId: string,
    cloudService: ReturnType<CloudServiceInterface>,
    postDbRepository: ReturnType<PostDbRepositoryInterface>,
) => {
    if (!postId) {
        throw new AppError('Please provide a post id', HttpStatusCodes.BAD_REQUEST);
    }
    if (!userId) {
        throw new AppError('Please provide a user id', HttpStatusCodes.BAD_REQUEST);
    }
    const post = await postDbRepository.getPostById(postId);
    console.log(post);
    if (post?.authorId.toString() !== userId) {
        throw new AppError('You cannot delete this post', HttpStatusCodes.BAD_REQUEST);
    }
    if (post) {
        await cloudService.removeFile(post.image.key);
    }
    await postDbRepository.deletePostById(postId);
};
