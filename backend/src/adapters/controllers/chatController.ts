import asyncHandler from "express-async-handler";
import {Request,Response} from 'express'
import Status from "../../constants/HttResponseStatus";

const chatController=()=>{
const createChat=asyncHandler(async(req:Request,res:Response)=>{
    const senderId=req.body.senderId;
    const receiverId=req.body.receiverId;
    res.status(200).json({
        status:Status.SUCCESS,
        message:'Chat created Successfully',
    })
})
}

export default chatController;