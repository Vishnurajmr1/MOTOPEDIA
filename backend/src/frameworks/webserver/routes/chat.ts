import express from "express"
// import chatController from "../../../adapters/controllers/chatController";
import jwtAuthMiddleware from "../middlewares/userAuthMiddleware";
import { chatDbRepository } from "../../../application/repositories/chatDBRepository";
import { chatRepositoryMongoDB } from "../../../frameworks/database/mongodb/repositories/chatRepoMongoDb";
import { userDbRepository } from "@src/application/repositories/userDBRepository";
import { userRepositoryMongoDB } from "@src/frameworks/database/mongodb/repositories/UserRepoMongoDb";

const chatRouter=()=>{
    const router=express.Router();
    // const controller=chatController(chatDbRepository,chatRepositoryMongoDB,userDbRepository,userRepositoryMongoDB);
    // router.route('/:userId').get(controller.createChat);
    // router.route('/find/:firstId/:secondId').get(jwtAuthMiddleware);
    // router.route('/history/:participantId').get(jwtAuthMiddleware,controller.chatHistory);
    // router.route('/').get()
    // router.route('/users');
    // router.route('/c/:receiverId')
    // router.route('/group');
    // router.route('/group/:chatId')
    // router.route('/group/:chatId/:participantId');
    // router.route('/leave/group/:chatId')
    // router.route('/remove/:chatId');
    return router;
}

export default chatRouter;