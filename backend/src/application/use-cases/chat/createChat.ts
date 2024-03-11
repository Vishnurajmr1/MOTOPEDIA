import AppError from '@src/utils/appError';
import { chatDbInterface } from '../../../application/repositories/chatDBRepository';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import { usersDbInterface } from '../../../application/repositories/userDBRepository';
import { emitSocketEvent } from '@src/frameworks/websocket/socket';

// export const createChatUseCase=async(senderId:string,recieverId:string,message:string,chatDbRepository:ReturnType<chatDbInterface>)=>{
//     if(!senderId||!recieverId){
//         throw new AppError('User is required to chat',HttpStatusCodes.BAD_REQUEST)
//     }
//     // const existingChat=await chatDbRepository.existingChat(senderId,recieverId,message);
//     // if(existingChat){
//     //     return existingChat;
//     // }
//     const newChat=await chatDbRepository.createChat(senderId,recieverId,message);
//     if(newChat){
//         console.log("New Chat created+woooooo");
//         console.log(newChat);
//         return newChat;
//     }
// }

export const createOneToOneChatUseCase = async (
    userId: string|undefined,
    recieverId: string,
    chatDbRepository: ReturnType<chatDbInterface>,
    userDbRepository: ReturnType<usersDbInterface>,
) => {
    try{

        if (!userId || !recieverId) {
            throw new AppError('Please provide a proper id', HttpStatusCodes.BAD_REQUEST);
        }
        
        const receiver = await userDbRepository.getUserById(recieverId);
    if (!receiver) {
        throw new AppError('receiver is not found', HttpStatusCodes.NOT_FOUND);
    }
    if (receiver._id.toString() === userId) {
        throw new AppError('You cannot chat with yourself', HttpStatusCodes.BAD_REQUEST);
    }
    const payload = await chatDbRepository.createOneToOneChat(userId, receiver._id);
    console.log('❌❌❌❌❌')
    console.log(payload);
    console.log('👏👏👏👏👏')
    if (!payload) {
        throw new AppError('Internal server error', HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
    return payload;
}catch(error:any){
    console.log(error);
}
};
