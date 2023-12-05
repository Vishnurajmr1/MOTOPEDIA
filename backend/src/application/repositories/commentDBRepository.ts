import { CommentRepositoryMongoDbInterface } from '@src/frameworks/database/mongodb/repositories/commentRepoMongoDb';
import { addCommentInterface } from '@src/types/commentInterface';

export const commentDbRepository = (repository: ReturnType<CommentRepositoryMongoDbInterface>) => {
    const addComment = async (commentInfo: addCommentInterface) => await repository.addComment(commentInfo);

    return {
        addComment,
    };
};

export type CommentDbRepositoryInterface = typeof commentDbRepository;
