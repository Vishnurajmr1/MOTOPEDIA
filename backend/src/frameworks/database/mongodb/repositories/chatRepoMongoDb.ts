import Chat from '../models/chat.Model';
import { IChat } from '../../../../types/chatInterface';

export const chatRepositoryMongoDB=()=>{
    // const getExistingChat=async(data:IChat)=>{
    //     const chatHistory=await Chat.findOne({
    //         $and:[{senderId:data.senderId},{recieverId:data.recieverId}]
    //     })
    //     return chatHistory;
    // }
    const addNewChat=async(data:IChat)=>{
        const newChat=await Chat.create({
            text:data.text,
            users:[data.senderId,data.recieverId],
            sender:data.senderId
        });
        return newChat.populate({
            select:'userId',
            path:'sender'
        });
    }
    const getChatHistory=async(userId:string,participantId:string)=>{
        const chatHistory=await Chat.find({users:{$all:[userId,participantId]}}).sort({createAt:1}).populate('sender');
        return chatHistory;
    }

    return {
        addNewChat,
        getChatHistory
        // getExistingChat,
    }
}

export type ChatRepositoryMongoDB=typeof chatRepositoryMongoDB;