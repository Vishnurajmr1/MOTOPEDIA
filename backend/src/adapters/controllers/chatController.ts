import asyncHandler from "express-async-handler";
import {Request,Response} from 'express'
import Status from "../../constants/HttResponseStatus";
import { createChatUseCase } from "../../application/use-cases/chat/createChat";
import { chatDbInterface } from "@src/application/repositories/chatDBRepository";
import { ChatRepositoryMongoDB } from "@src/frameworks/database/mongodb/repositories/chatRepoMongoDb";

const chatController=(
    chatDbRepository:chatDbInterface,
    chatDbRepositoryImplemtation:ChatRepositoryMongoDB
)=>{
    const dbRepositoryChat=chatDbRepository(chatDbRepositoryImplemtation());
const createChat=asyncHandler(async(req:Request,res:Response)=>{
    const senderId=req.body.senderId;
    const receiverId=req.body.receiverId;
    const result =await createChatUseCase(senderId,receiverId,dbRepositoryChat)
    res.status(200).json({
        status:Status.SUCCESS,
        message:'Chat created Successfully',
        result
    })
})
return{
    createChat
}
}

export default chatController;