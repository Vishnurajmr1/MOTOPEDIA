import { CommentRepositoryMongoDbInterface } from '../../frameworks/database/mongodb/repositories/commentRepoMongoDb';
import { addCommentInterface } from '../../types/commentInterface';

export const commentDbRepository = (repository: ReturnType<CommentRepositoryMongoDbInterface>) => {
    const addComment = async (commentInfo: addCommentInterface) => await repository.addComment(commentInfo);
    const getCommentsByPostId=async(postId:string)=>await repository.getCommentByPostId(postId);
    return {
        addComment,
        getCommentsByPostId
    };
};

export type CommentDbRepositoryInterface = typeof commentDbRepository;
