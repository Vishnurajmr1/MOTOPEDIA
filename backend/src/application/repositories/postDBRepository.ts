import { PostRepositoryMongoDbInterface } from '@src/frameworks/database/mongodb/repositories/postRepoMongoDb';
import { AddPostInterface, EditPostInterface } from '@src/types/postInterface';

export const postDbRepository = (repository: ReturnType<PostRepositoryMongoDbInterface>) => {
    const addPost = async (postInfo: AddPostInterface) => await repository.addPost(postInfo);
    const editPost = async (postId: string, editInfo: EditPostInterface) => await repository.editPost(postId, editInfo);
    return {
        addPost,
        editPost,
    };
};

export type PostDbRepositoryInterface = typeof postDbRepository;
