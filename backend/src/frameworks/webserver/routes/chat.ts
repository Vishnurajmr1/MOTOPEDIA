import chatController from "../../../adapters/controllers/chatController";
import express from "express"
import jwtAuthMiddleware from "../middlewares/userAuthMiddleware";
import { chatDbRepository } from "../../../application/repositories/chatDBRepository";
import { chatRepositoryMongoDB } from "../../../frameworks/database/mongodb/repositories/chatRepoMongoDb";
import { userDbRepository } from "@src/application/repositories/userDBRepository";
import { userRepositoryMongoDB } from "@src/frameworks/database/mongodb/repositories/UserRepoMongoDb";

const chatRouter=()=>{
    const router=express.Router();
    const controller=chatController(chatDbRepository,chatRepositoryMongoDB,userDbRepository,userRepositoryMongoDB);
    // router.route('/:userId').get(controller.createChat);
    // router.route('/find/:firstId/:secondId').get(jwtAuthMiddleware);
    router.route('/history/:participantId').get(jwtAuthMiddleware,controller.chatHistory);
    return router;
}

export default chatRouter;