import { ChatDbRepositoryInterface } from "../../../application/repositories/chatDBRepository";
import { ChatMessageDbRepositoryInterface } from "../../../application/repositories/messageDBRepository";
import HttpStatusCodes from "../../../constants/HttpStatusCodes";
import AppError from "../../../utils/appError";

export const getAllMessagesUseCase=async(userId:string|undefined,chatId:string,chatDbRepository:ReturnType<ChatDbRepositoryInterface>,chatMessageDbRepository:ReturnType<ChatMessageDbRepositoryInterface>)=>{
    const selectedChat=await chatDbRepository.getChatById(chatId);
    console.log(selectedChat);
    if(!selectedChat){
        throw new AppError('Chat does not exist',HttpStatusCodes.NOT_FOUND);
    }
    const participants=await chatDbRepository.getParticipantsOfChat(chatId);
    console.log(participants);
    if(!participants.includes(userId)){
        throw new AppError('User is not a part of this chat',HttpStatusCodes.BAD_REQUEST)
    }
    const messages=await chatMessageDbRepository.getAllMessages(chatId);
    return messages;
}