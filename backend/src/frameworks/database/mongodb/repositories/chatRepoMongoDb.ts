import Chat from '../models/chat.Model';
import { IChat } from '../../../../types/chatInterface';

export const chatRepositoryMongoDB=()=>{
    const getExistingChat=async(data:IChat)=>{
        await Chat.findOne({
            $and:[{members:data.senderId},{members:data.recieverId}]
        })
    }
    const addNewChat=async(data:IChat)=>{
        const newChat=new Chat({members:[data]});
        return await newChat.save();
    }

    return {
        getExistingChat,
        addNewChat
    }
}

export type ChatRepositoryMongoDB=typeof chatRepositoryMongoDB;