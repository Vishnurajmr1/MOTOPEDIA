import { PostDbRepositoryInterface } from '@src/application/repositories/postDBRepository';
import { CloudServiceInterface } from '@src/application/services/cloudServiceInterface';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { postInterface } from '@src/types/postInterface';
import AppError from '@src/utils/appError';

export const getAllPostsUseCase = async (
    cloudService: ReturnType<CloudServiceInterface>,
    postDbRepository: ReturnType<PostDbRepositoryInterface>,
) => {
    const posts: postInterface[] | null = await postDbRepository.getAllPosts();
    await Promise.all(
        posts.map(async (post) => {
            if (post.image) {
                post.imageUrl = await cloudService.getFile(post.image.key);
            }
        }),
    );
    return posts;
};

export const getPostByUserUseCase = async (
    userId: string | undefined,
    cloudService: ReturnType<CloudServiceInterface>,
    postDbRepository: ReturnType<PostDbRepositoryInterface>,
) => {
    if (!userId) {
        throw new AppError('Invalid user Id', HttpStatusCodes.BAD_REQUEST);
    }
    const posts = await postDbRepository.getPostByUser(userId);

    await Promise.all(
        posts.map(async (post) => {
            if (post.image) {
                post.imageUrl = await cloudService.getFile(post.image.key);
            }
        }),
    );
    return posts;
};
