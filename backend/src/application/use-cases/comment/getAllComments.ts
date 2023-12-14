import { CommentDbRepositoryInterface } from '@src/application/repositories/commentDBRepository';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import AppError from '@src/utils/appError';

export const getAllComments = async (postId: string, commentDbRepository: ReturnType<CommentDbRepositoryInterface>) => {
    if (!postId) {
        throw new AppError('Please provide postId', HttpStatusCodes.BAD_REQUEST);
    }
    let comments = await commentDbRepository.getCommentsByPostId(postId);
    if (comments.length === 0) {
        comments = [];
    }
    return comments;
};
