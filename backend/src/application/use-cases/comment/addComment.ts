import { CommentDbRepositoryInterface } from '../../../application/repositories/commentDBRepository';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import { addCommentInterface } from '../../../types/commentInterface';
import AppError from '../../../utils/appError';

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
