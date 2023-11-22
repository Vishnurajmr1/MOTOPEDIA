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
