import chatController from "../../../adapters/controllers/chatController";
import express from "express"
import jwtAuthMiddleware from "../middlewares/userAuthMiddleware";
import { chatDbRepository } from "../../../application/repositories/chatDBRepository";
import { chatRepositoryMongoDB } from "../../../frameworks/database/mongodb/repositories/chatRepoMongoDb";

const chatRouter=()=>{
    const router=express.Router();
    const controller=chatController(chatDbRepository,chatRepositoryMongoDB);
    // router.route('/:userId').get(controller.createChat);
    router.route('/find/:firstId/:secondId').get(jwtAuthMiddleware);
    router.route('/createChat').post();
    return router;
}

export default chatRouter;