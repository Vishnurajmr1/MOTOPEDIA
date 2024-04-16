import { PostRepositoryMongoDbInterface } from '../../frameworks/database/mongodb/repositories/postRepoMongoDb';
import { AddPostInterface, EditPostInterface } from '../../types/postInterface';

export const postDbRepository = (repository: ReturnType<PostRepositoryMongoDbInterface>) => {
    const addPost = async (postInfo: AddPostInterface) => await repository.addPost(postInfo);
    const editPost = async (postId: string, editInfo: EditPostInterface) => await repository.editPost(postId, editInfo);
    const getPostById=async(postId:string)=>await repository.getPostById(postId);
    const deletePostById=async(postId:string)=>await repository.deletePost(postId);
    const getAllPosts=async()=>await repository.getAllPost();
    const getPostByUser=async(userId:string)=>await repository.getPostByUser(userId)
    const getSavedPosts=async(userId:string)=>await repository.getSavedPostsByUser(userId);
    return {
        addPost,
        editPost,
        getPostById,
        getAllPosts,
        deletePostById,
        getPostByUser,
        getSavedPosts
    };
};

export type PostDbRepositoryInterface = typeof postDbRepository;
