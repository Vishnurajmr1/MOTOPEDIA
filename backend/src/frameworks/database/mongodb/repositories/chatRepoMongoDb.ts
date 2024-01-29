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

    return {
        addNewChat
        // getExistingChat,
    }
}

export type ChatRepositoryMongoDB=typeof chatRepositoryMongoDB;