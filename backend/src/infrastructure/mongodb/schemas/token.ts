import mongoose from "mongoose";

const tokenSchema=new mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    expires_in:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
})

const TokenModel=mongoose.model('Token',tokenSchema);


export  default TokenModel;