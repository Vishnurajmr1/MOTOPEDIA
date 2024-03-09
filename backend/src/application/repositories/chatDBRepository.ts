import { ChatRepositoryMongoDB } from "@src/frameworks/database/mongodb/repositories/chatRepoMongoDb";

export const chatDbRepository=(repository:ReturnType<ChatRepositoryMongoDB>)=>{
    // const createChat=async(senderId:string,recieverId:string,text:string)=>await repository.addNewChat({senderId,recieverId,text});
    // const existingChat=async(senderId:string,recieverId:string,text:string)=>await repository.getExistingChat({senderId,recieverId,text});
    // const chatHistory=async(userId:string,participantId:string)=>await repository.getChatHistory(userId,participantId);
    // return{
    //     createChat,
    //     chatHistory
    //     // existingChat
    // }
}

export type chatDbInterface=typeof chatDbRepository;