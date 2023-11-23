import { PostRepositoryMongoDbInterface } from '@src/frameworks/database/mongodb/repositories/postRepoMongoDb';
import { AddPostInterface, EditPostInterface } from '@src/types/postInterface';

export const postDbRepository = (repository: ReturnType<PostRepositoryMongoDbInterface>) => {
    const addPost = async (postInfo: AddPostInterface) => await repository.addPost(postInfo);
    const editPost = async (postId: string, editInfo: EditPostInterface) => await repository.editPost(postId, editInfo);
    const getPostById=async(postId:string)=>await repository.getPostById(postId);
    const deletePostById=async(postId:string)=>await repository.deletePost(postId);
    const getPosts=async()=>await repository.getAllPost();
    return {
        addPost,
        editPost,
        getPostById,
        getPosts,
        deletePostById
    };
};

export type PostDbRepositoryInterface = typeof postDbRepository;
