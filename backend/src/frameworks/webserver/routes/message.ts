import express from 'express'
import jwtAuthMiddleware from '../middlewares/userAuthMiddleware'
import messageController from '@src/adapters/controllers/messageController';
import { cloudServiceInterface } from '@src/application/services/cloudServiceInterface';
import { s3Service } from '@src/frameworks/services/s3Service';
import { chatMessageRepositoryMongoDB } from '@src/frameworks/database/mongodb/repositories/messageRepoMongoDb';
import { chatMessageDbRepository } from '@src/application/repositories/messageDBRepository';
import { chatDbRepository } from '@src/application/repositories/chatDBRepository';
import { chatRepositoryMongoDB } from '@src/frameworks/database/mongodb/repositories/chatRepoMongoDb';
import upload from '../middlewares/multer';


const messageRouter=()=>{
   const router=express.Router();
   const controller=messageController(cloudServiceInterface,s3Service,chatDbRepository,chatRepositoryMongoDB,chatMessageDbRepository,chatMessageRepositoryMongoDB)
   router.use(jwtAuthMiddleware);
   router.route('/:chatId').get(controller.getAllMessages).post(upload.single('image'),controller.sendMessage)
   return router;
}

export default messageRouter;