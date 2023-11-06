import mongoose from "mongoose";

const roleSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    description:{
        type:String,
        maxlength:255
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

const Role=mongoose.model('Role',roleSchema);

export default Role;