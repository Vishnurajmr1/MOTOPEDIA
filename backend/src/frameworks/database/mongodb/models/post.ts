import mongoose, { Schema } from 'mongoose';
const FileSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
});
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: FileSchema,
        required: true,
    },
    imageUrl:{
        type:String,
        default:''
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    likes: {
        type: Number,
        default: 0,
    },
    likedBy: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        default: [],
    },
    savedPosts: 
    [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    reportCount: {
        type: Number,
        default: 0,
    }
});

const Post = mongoose.model('Post', postSchema, 'posts');
export default Post;
