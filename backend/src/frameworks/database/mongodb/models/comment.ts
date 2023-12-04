import { Schema, model } from 'mongoose';

const commentSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        postId: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
        },
        content: {
            type: String,
            required: true,
            trim: true,
            maxLength: 500,
        },
        parentId: {
            type: Schema.Types.ObjectId,
            ref: 'comment',
        },
        deleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

export const comment = model('Comment', commentSchema, 'comment');
