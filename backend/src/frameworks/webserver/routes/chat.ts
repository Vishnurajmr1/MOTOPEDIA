import chatController from "../../../adapters/controllers/chatController";
import express from "express"
import jwtAuthMiddleware from "../middlewares/userAuthMiddleware";

const chatRouter=()=>{
    const router=express.Router();
    const controller=chatController();

    router.route('/:userId').get();
    router.route('/find/:firstId/:secondId').get(jwtAuthMiddleware);
    router.route('/createChat').post();
}

export default chatRouter;