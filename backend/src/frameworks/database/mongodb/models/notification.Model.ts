import mongoose, {Schema,Model, model} from 'mongoose'

const notificationSchema=new Schema({
    senderId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    text:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    read:{
        type:Boolean,
        default:false
    },
    url:{
        type:String
    },
},
{
    timestamps:true
}
)

const notificationModel=model('notification',notificationSchema);
export default notificationModel;