import { AddPostInterface, EditPostInterface, postInterface } from '../../../../types/postInterface';
import Post from '../models/post';
import mongoose from 'mongoose';

export const postRepositoryMongoDb = () => {
    const addPost = async (postInfo: AddPostInterface) => {
        const newPost = new Post(postInfo);
        const { _id: postId } = await newPost.save();
        return postId;
    };
    const editPost = async (postId: string, editInfo: EditPostInterface) => {
        const response = await Post.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(postId) },
            { ...editInfo },
            { new: true },
        );
        return response;
    };
    const getPostById = async (postId: string) => {
        const post: postInterface | null = await Post.findOne({ _id: new mongoose.Types.ObjectId(postId) }).populate({
            path: 'authorId',
            select: 'firstName lastName ',
        });
        return post;
    };
    const getAllPost = async () => {
        const posts: postInterface[] = await Post.find({}).sort({ createdAt: -1 }).populate({
            path: 'authorId',
            select: 'firstName lastName ',
        });
        return posts;
    };
    const deletePost = async (postId: string) => {
        await Post.deleteOne({ _id: new mongoose.Types.ObjectId(postId) });
    };
    const getPostByUser = async (userId: string) => {
        const posts: postInterface[] | null = await Post.find({
            authorId: { $in: [new mongoose.Types.ObjectId(userId)] },
        }).populate({path:'authorId',select:'firstName lastName'});
        return posts;
    };
    const getSavedPostsByUser = async (userId: string) => {
        const posts: postInterface[] | null = await Post.find({
            savedPosts: { $in: [new mongoose.Types.ObjectId(userId)] },
        });
        return posts;
    };
    return {
        addPost,
        editPost,
        getPostById,
        getAllPost,
        deletePost,
        getPostByUser,
        getSavedPostsByUser
    };
};

export type PostRepositoryMongoDbInterface = typeof postRepositoryMongoDb;
