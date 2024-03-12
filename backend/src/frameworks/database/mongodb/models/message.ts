import mongoose, { Schema } from 'mongoose';
import { FileSchema } from './post';
const chatMessageSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        content: {
            type: String,
        },
        attachments: {
            type: [
                {
                    file: FileSchema,
                    url: String,
                },
            ],
            default: [],
        },
        chat: {
            type: Schema.Types.ObjectId,
            ref: 'Chat',
        },
    },
    { timestamps: true },
);

export const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);
