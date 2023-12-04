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
    imageUrl: {
        type: String,
        default: '',
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
        thumbsUp: {
            type: Number,
            default: 0,
        },
        like: {
            type: Number,
            default: 0,
        },
        heart: {
            type: Number,
            default: 0,
        },
    },
    likedBy: [
        {
            userId: { type:Schema.Types.ObjectId, ref: 'User' },
            reactionType: {
                type: String,
                enum: ['thumbsUp', 'like', 'heart'],
            },
        },
    ],
    savedPosts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    reportCount: {
        type: Number,
        default: 0,
    },
});

const Post = mongoose.model('Post', postSchema, 'posts');
export default Post;
