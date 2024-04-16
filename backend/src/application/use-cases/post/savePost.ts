import { PostDbRepositoryInterface } from '../../../application/repositories/postDBRepository';
import { CloudServiceInterface } from '../../../application/services/cloudServiceInterface';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import { EditPostInterface } from '../../../types/postInterface';
import AppError from '../../../utils/appError';

export const savePostUseCase = async (
    userId: string | undefined,
    postId: string,
    postDbRepository: ReturnType<PostDbRepositoryInterface>,
) => {
    if (!postId) {
        throw new AppError('Please provide a post id', HttpStatusCodes.BAD_REQUEST);
    }
    if (!userId) {
        throw new AppError('unable to get userId', HttpStatusCodes.FORBIDDEN);
    }
    const oldPost = await postDbRepository.getPostById(postId);

    if (userId) {
        const exisitingUser: number = oldPost?.savedPosts?.indexOf(userId) ?? -1;
        if (exisitingUser === -1) {
            oldPost?.savedPosts?.push(userId);
        } else {
            oldPost?.savedPosts?.splice(exisitingUser, 1);
        }
        const response = await postDbRepository.editPost(postId, oldPost as EditPostInterface);
        return response;
    }
};

export const getSavedPostsUseCase = async (
    userId: string | undefined,
    postDbRepository: ReturnType<PostDbRepositoryInterface>,
    cloudService: ReturnType<CloudServiceInterface>,
) => {
    if (!userId) {
        throw new AppError('unable to get userId', HttpStatusCodes.FORBIDDEN);
    }

    const posts = await postDbRepository.getSavedPosts(userId);
    if (posts !== null) {
        await Promise.all(
            posts.map(async (post) => {
                if (post.image) {
                    post.imageUrl = await cloudService.getFile(post.image.key);
                }
            }),
        );
    }

    return posts;
};
