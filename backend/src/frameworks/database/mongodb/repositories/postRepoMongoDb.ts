import { AddPostInterface, EditPostInterface, postInterface } from '@src/types/postInterface';
import Post from '../models/post';
import mongoose from 'mongoose';

export const postRepositoryMongoDb = () => {
    const addPost = async (postInfo: AddPostInterface) => {
        const newPost = new Post(postInfo);
        const { _id: postId } = await newPost.save();
        return postId;
    };
    const editPost = async (postId: string, editInfo: EditPostInterface) => {
        const response = await Post.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(postId) }, { ...editInfo });
        return response;
    };
    const getPostById = async (postId: string) => {
        const post: postInterface | null = await Post.findOne({ _id: new mongoose.Types.ObjectId(postId) });
        return post;
    };
    const getAllPost = async () => {
        const posts: postInterface[] = await Post.find({});
        return posts;
    };
    const deletePost = async (postId: string) => {
        await Post.deleteOne({ _id: new mongoose.Types.ObjectId(postId) });
    };
    return {
        addPost,
        editPost,
        getPostById,
        getAllPost,
        deletePost,
    };
};

export type PostRepositoryMongoDbInterface = typeof postRepositoryMongoDb;
