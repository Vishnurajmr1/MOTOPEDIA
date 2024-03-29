import mongoose from 'mongoose';
import { ChatMessage } from '../models/message';
import { IaddMessage } from '@src/types/messageInterface';

const chatMessageCommonAggregation = () => {
    return [
        {
            $lookup: {
                from: 'user',
                foreignField: '_id',
                localField: 'sender',
                as: 'sender',
                pipeline: [
                    {
                        $project: {
                            firstName: 1,
                            lastName: 1,
                            email: 1,
                            profilePic: 1,
                        },
                    },
                ],
            },
        },
        {
            $addFields: {
                sender: { $first: '$sender' },
            },
        },
    ];
};

export const chatMessageRepositoryMongoDB = () => {
    const getAllMessages = async (chatId: string) => {
        const messages = await ChatMessage.aggregate([
            {
                $match: {
                    chat: new mongoose.Types.ObjectId(chatId),
                },
            },
            ...chatMessageCommonAggregation(),
            {
                $sort: {
                    createdAt: 1,
                },
            },
        ]);
        return messages;
    };

    const sendMessage = async (messageInfo: IaddMessage) => {
        const newMessage = await ChatMessage.create(messageInfo);
        return newMessage;
    };
    const maintainMessage = async (newMessageId: string) => {
        const messages = await ChatMessage.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(newMessageId),
                },
            },
            ...chatMessageCommonAggregation(),
        ]);
        const receivedMessage = messages[0];
        return receivedMessage;
    };
    return {
        getAllMessages,
        sendMessage,
        maintainMessage,
    };
};

export type ChatMessageRepositoryMongoDB = typeof chatMessageRepositoryMongoDB;
