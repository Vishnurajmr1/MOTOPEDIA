import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

export const postModel = mongoose.model('Post', postSchema, 'posts');
