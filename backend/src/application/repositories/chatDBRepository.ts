import { ChatRepositoryMongoDB } from "@src/frameworks/database/mongodb/repositories/chatRepoMongoDb";

export const chatDbRepository=(repository:ReturnType<ChatRepositoryMongoDB>)=>{
    const createChat=async(senderId:string,recieverId:string)=>await repository.addNewChat({senderId,recieverId});
    const existingChat=async(senderId:string,recieverId:string)=>await repository.getExistingChat({senderId,recieverId});
    return{
        createChat,
        existingChat
    }
}

export type chatDbInterface=typeof chatDbRepository;