// import asyncHandler from "express-async-handler";
// import {Request,Response} from 'express'
// import Status from "../../constants/HttResponseStatus";
// import { createChatUseCase } from "../../application/use-cases/chat/createChat";
// import { chatDbInterface } from "../../application/repositories/chatDBRepository";
// import { ChatRepositoryMongoDB } from "../../frameworks/database/mongodb/repositories/chatRepoMongoDb";
// import { CustomRequest } from "../../types/customRequest";
// import { usersDbInterface } from "@src/application/repositories/userDBRepository";
// import { UserRepositoryMongoDB } from "@src/frameworks/database/mongodb/repositories/UserRepoMongoDb";
// import { getChatHistoryUseCase } from "@src/application/use-cases/chat/getChat";

// const chatController=(
//     chatDbRepository:chatDbInterface,
//     chatDbRepositoryImplemtation:ChatRepositoryMongoDB,
//     userDbRepository:usersDbInterface,
//     userDbRepositoryImplementation:UserRepositoryMongoDB
// )=>{
//     const dbRepositoryChat=chatDbRepository(chatDbRepositoryImplemtation());
//     const dbRepositoryUser=userDbRepository(userDbRepositoryImplementation());
// const createChat=async(senderId:string,receiverId:string,message:string)=>{
//     const result = await createChatUseCase(senderId,receiverId,message,dbRepositoryChat);
//     return result;
//     // res.status(200).json({
//     //     status:Status.SUCCESS,
//     //     message:'Chat created Successfully',
//     //     result
//     // })
// }

// const chatHistory=asyncHandler(async(req:CustomRequest,res:Response)=>{
//     const participantId=req.params.participantId;
//     const userId=req.user?.Id as string;
//      const result = await getChatHistoryUseCase(userId,participantId,dbRepositoryChat,dbRepositoryUser);
//      if(result){
//         const {chatHistory:messages,participant}=result;
//         res.status(200).json({
//             status:Status.SUCCESS,
//             message:'Chat History retrieve successfully',
//             history:{messages,participant}
//         })
//      }
// })
// return{
//     createChat,
//     chatHistory
// }
// }

// export default chatController;