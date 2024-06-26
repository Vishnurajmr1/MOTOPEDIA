import Chat from '../models/chat'
import { ChatMessage } from '../models/message';
import mongoose from 'mongoose';

const chatCommonAggregation = () => {
    return [
        {
            $lookup: {
                from: 'user',
                foreignField: '_id',
                localField: 'participants',
                as: 'participants',
                pipeline: [
                    {
                        $project: {
                            password: 0,
                            otp: 0,
                            isVerifiedEmail: 0,
                            isGoogleUser: 0,
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: 'chatmessages',
                foreignField: '_id',
                localField: 'lastMessage',
                as: 'lastMessage',
                pipeline: [
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
                ],
            },
        },
        {
            $addFields: {
                lastMessage: { $first: '$lastMessage' },
            },
        },
    ];
};
export const chatRepositoryMongoDB = () => {
    const deleteCascadeChatMessages = async (chatId: string) => {
        const messages = await ChatMessage.find({
            chat: new mongoose.Types.ObjectId(chatId),
        });

        // let attachments = [];
        // attachments = attachments.concat(
        //     ...messages.map((message) => {
        //       return message.attachments.at(0)?.url?.key
        //     })
        //   );
        await ChatMessage.deleteMany({
            chat: new mongoose.Types.ObjectId(chatId),
        });
    };

    const createOrGetOneToOneChat = async (userId: string, recieverId: string) => {
        const chat = await Chat.aggregate([
            {
                $match: {
                    isGroupChat: false,
                    $and: [
                        {
                            participants: { $elemMatch: { $eq: new mongoose.Types.ObjectId(userId) } },
                        },
                        {
                            participants: { $elemMatch: { $eq: new mongoose.Types.ObjectId(recieverId) } },
                        },
                    ],
                },
            },
            ...chatCommonAggregation(),
        ]);
        if (chat.length) {
            return chat[0];
        }

        const newChatInstance = await Chat.create({
            name: 'One on one Chat',
            participants: [userId,recieverId],
            admin: userId,
        });
        const createChat = await Chat.aggregate([
            {
                $match: {
                    _id: newChatInstance._id,
                },
            },
            ...chatCommonAggregation(),
        ]);
        const payload = createChat[0];
        if (payload) return payload;
    };

    const createAGroupChat = async (name: string, members: [string], userId: string) => {
        const groupChat = await Chat.create({
            name,
            isGroupChat: true,
            participants: members,
            admin: userId,
        });

        const chat = await Chat.aggregate([
            {
                $match: {
                    _id: groupChat._id,
                },
            },

            ...chatCommonAggregation(),
        ]);
        const payload = chat[0];

        if (payload) return payload;
    };

    const getGroupChatDetails = async (chatId: string) => {
        const groupChat = await Chat.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(chatId),
                    isGroupChat: true,
                },
            },
            ...chatCommonAggregation(),
        ]);
        const chat = groupChat[0];
        if (chat) return chat;
    };
    const renameGroupChat = async (chatId: string, name: string) => {
        const updatedGroupChat = await Chat.findByIdAndUpdate(chatId, { $set: { name } }, { new: true });
        const chat = await Chat.aggregate([
            {
                $match: {
                    _id: updatedGroupChat?._id,
                },
            },
            ...chatCommonAggregation(),
        ]);
        const payload = chat[0];
        return payload;
    };

    const getAllChats=async(userId:string)=>{
        const chats=await Chat.aggregate([
            {
                $match:{
                    participants:{$elemMatch:{$eq:new mongoose.Types.ObjectId(userId)}}
                }
            },
            {
                $sort:{
                    updatedAt:1
                }
            },
            ...chatCommonAggregation()
        ])
        return chats
    }
    const getChatById=async(chatId:string)=>{
        const chat=await Chat.findById(chatId);
        return chat;
    }
    const checkUserIsAParticipantOfChat=async(chatId:string,userId:string)=>{
        const particpants=await Chat.aggregate([
            {
                $match:{
                    _id:new mongoose.Types.ObjectId(chatId),
                    participants:{$elemMatch:{$eq:new mongoose.Types.ObjectId(userId)}}
                }
            },
            {
                $limit:1
            }
        ])
        
        return particpants.length>0;
    }
    const updateLastMessageChat=async(chatId:string,messageId:string)=>{
        const chat=await Chat.findByIdAndUpdate(
            chatId,
            {
                $set:{
                    lastMessage:new mongoose.Types.ObjectId(messageId)
                }
            },
            {new:true}
        )
        return chat;
    }


    return {
        createAGroupChat,
        createOrGetOneToOneChat,
        getGroupChatDetails,
        getAllChats,
        renameGroupChat,
        updateLastMessageChat,
        getChatById,
        checkUserIsAParticipantOfChat
    };
};

export type ChatRepositoryMongoDB = typeof chatRepositoryMongoDB;
