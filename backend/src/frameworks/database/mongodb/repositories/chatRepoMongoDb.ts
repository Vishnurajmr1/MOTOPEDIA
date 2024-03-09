import Chat from '../models/chat.Model';
import { ChatMessage } from '../models/message';
import mongoose from 'mongoose';

// export const chatRepositoryMongoDB=()=>{
//     // const getExistingChat=async(data:IChat)=>{
//     //     const chatHistory=await Chat.findOne({
//     //         $and:[{senderId:data.senderId},{recieverId:data.recieverId}]
//     //     })
//     //     return chatHistory;
//     // }
//     const addNewChat=async(data:IChat)=>{
//         const newChat=await Chat.create({
//             text:data.text,
//             users:[data.senderId,data.recieverId],
//             sender:data.senderId
//         });
//         return newChat.populate({
//             select:'userId',
//             path:'sender'
//         });
//     }
//     const getChatHistory=async(userId:string,participantId:string)=>{
//         const chatHistory=await Chat.find({users:{$all:[userId,participantId]}}).sort({createAt:1}).populate('sender');
//         return chatHistory;
//     }

//     return {
//         addNewChat,
//         getChatHistory
//         // getExistingChat,
//     }
// }
const chatCommonAggregation = () => {
    return [
        {
            $lookup: {
                from: '$user',
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
                            participants: { $elemMatch: { $eq: userId } },
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
            participants: [userId, recieverId],
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
                    participants:{$elemMatch:{$eq:userId}}
                }
            },
            {
                $sort:{
                    updatedAt:-1
                }
            },
            ...chatCommonAggregation()
        ])
        return chats
    }

    return {
        createAGroupChat,
        createOrGetOneToOneChat,
        getGroupChatDetails,
        getAllChats,
        renameGroupChat,
    };
};

export type ChatRepositoryMongoDB = typeof chatRepositoryMongoDB;
