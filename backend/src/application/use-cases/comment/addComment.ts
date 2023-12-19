import { CommentDbRepositoryInterface } from '@src/application/repositories/commentDBRepository';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { addCommentInterface } from '@src/types/commentInterface';
import AppError from '@src/utils/appError';

export const addComment = async (
    userId: string | undefined,
    postId: string,
    commentInfo: addCommentInterface,
    commentDbRepository: ReturnType<CommentDbRepositoryInterface>,
) => {
    if (!userId || !commentInfo) {
        throw new AppError('Invalid input data', HttpStatusCodes.BAD_REQUEST);
    }
    commentInfo.userId = userId;
    commentInfo.postId = postId;
    const comments = await commentDbRepository.addComment(commentInfo);
    return comments;
};
