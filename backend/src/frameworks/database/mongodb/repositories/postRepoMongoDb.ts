import { AddPostInterface, EditPostInterface } from '@src/types/postInterface';
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
    return {
        addPost,
        editPost,
    };
};

export type PostRepositoryMongoDbInterface = typeof postRepositoryMongoDb;
