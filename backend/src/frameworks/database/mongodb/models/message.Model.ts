import {Schema,model} from 'mongoose'

const messageSchema=new Schema(
    {
        chatId:{
            type:String
        },
        senderId:{
            type:String
        },
        text:{
            type:String
        },
        media:{
            type:String
        }
    },
    {
        timestamps:true
    })

export const message=model('Message',messageSchema);