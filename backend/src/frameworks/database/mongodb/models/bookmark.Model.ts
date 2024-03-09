import mongoose, { Schema } from 'mongoose';

const bookmarkSchema = new Schema(
    {
        postId: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
        },
        bookmarkedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    },
);

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
export default Bookmark;
