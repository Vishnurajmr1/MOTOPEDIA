import { ChatRepositoryMongoDB } from "@src/frameworks/database/mongodb/repositories/chatRepoMongoDb";

export const chatDbRepository=(repository:ReturnType<ChatRepositoryMongoDB>)=>{
    const createChat=async(senderId:string,recieverId:string,text:string)=>await repository.addNewChat({senderId,recieverId,text});
    // const existingChat=async(senderId:string,recieverId:string,text:string)=>await repository.getExistingChat({senderId,recieverId,text});
    return{
        createChat,
        // existingChat
    }
}

export type chatDbInterface=typeof chatDbRepository;