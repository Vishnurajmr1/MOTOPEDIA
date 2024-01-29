import mongoose, { Schema, model } from 'mongoose';

const chatSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        readBy: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                readAt: {
                    type: Date,
                    default: null,
                },
            },
        ],
    },
    {
        timestamps: true,
    },
);

const ChatModel = model('Chat', chatSchema);
export default ChatModel;
