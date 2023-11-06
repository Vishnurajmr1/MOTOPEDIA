import mongoose from "mongoose";

const userRoleSchema=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    role_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Role',
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

const UserRoles=mongoose.model('UserRoles',userRoleSchema);

export default UserRoles;