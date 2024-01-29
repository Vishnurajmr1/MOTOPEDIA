import AppError from "@src/utils/appError";
import { chatDbInterface } from "../../../application/repositories/chatDBRepository";
import HttpStatusCodes from "../../../constants/HttpStatusCodes";

export const createChatUseCase=async(senderId:string,recieverId:string,message:string,chatDbRepository:ReturnType<chatDbInterface>)=>{
    if(!senderId||!recieverId){
        throw new AppError('User is required to chat',HttpStatusCodes.BAD_REQUEST)
    }
    // const existingChat=await chatDbRepository.existingChat(senderId,recieverId,message);
    // if(existingChat){
    //     return existingChat;
    // }
    const newChat=await chatDbRepository.createChat(senderId,recieverId,message);
    if(newChat){
        console.log("New Chat created+woooooo");
        console.log(newChat);
        return newChat;  
    }
}