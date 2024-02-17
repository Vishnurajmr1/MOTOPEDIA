import { Schema, model } from "mongoose";

const reportSchema=new Schema({
    reporterId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    targetType:{
        type:String,
        required:true
    },
    targetId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    reason:{
        type:String
    }, 
},{
    timestamps:true
})
const ReportModel=model('Report',reportSchema,'report');

export default ReportModel;