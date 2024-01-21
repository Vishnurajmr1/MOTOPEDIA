import { chatDbInterface } from "../../../application/repositories/chatDBRepository";

export const createChatUseCase=async(senderId:string,recieverId:string,chatDbRepository:ReturnType<chatDbInterface>)=>{
    const existingChat=await chatDbRepository.existingChat(senderId,recieverId)
}