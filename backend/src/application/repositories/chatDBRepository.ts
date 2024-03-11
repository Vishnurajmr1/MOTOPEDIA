import { ChatRepositoryMongoDB } from "@src/frameworks/database/mongodb/repositories/chatRepoMongoDb";

export const chatDbRepository=(repository:ReturnType<ChatRepositoryMongoDB>)=>{
    const createOneToOneChat=async(senderId:string,recieverId:string)=>await repository.createOrGetOneToOneChat(senderId,recieverId);
    const createAGroupChat=async(name:string,members:[string],userId:string)=>await repository.createAGroupChat(name,members,userId);
    const getGroupChatDetails=async(chatId:string)=>await repository.getGroupChatDetails(chatId)
    const getAllChats=async(userId:string)=>await repository.getAllChats(userId)
    const renameGroupChat=async(chatId:string,name:string)=>await repository.renameGroupChat(chatId,name);
    return{
        createAGroupChat,
        createOneToOneChat,
        getGroupChatDetails,
        getAllChats,
        renameGroupChat
    }
}

export type chatDbInterface=typeof chatDbRepository;