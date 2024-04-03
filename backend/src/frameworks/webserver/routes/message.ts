import express from 'express'
import jwtAuthMiddleware from '../middlewares/userAuthMiddleware'
import messageController from '../../../adapters/controllers/messageController';
import { cloudServiceInterface } from '../../../application/services/cloudServiceInterface';
import { s3Service } from '../../../frameworks/services/s3Service';
import { chatMessageRepositoryMongoDB } from '../../../frameworks/database/mongodb/repositories/messageRepoMongoDb';
import { chatMessageDbRepository } from '../../../application/repositories/messageDBRepository';
import { chatDbRepository } from '../../../application/repositories/chatDBRepository';
import { chatRepositoryMongoDB } from '../../../frameworks/database/mongodb/repositories/chatRepoMongoDb';
import upload from '../middlewares/multer';


const messageRouter=()=>{
   const router=express.Router();
   const controller=messageController(cloudServiceInterface,s3Service,chatDbRepository,chatRepositoryMongoDB,chatMessageDbRepository,chatMessageRepositoryMongoDB)
   router.use(jwtAuthMiddleware);
   router.route('/:chatId').get(controller.getAllMessages).post(upload.single('image'),controller.sendMessage)
   return router;
}

export default messageRouter;