import {Schema,model} from 'mongoose';

const chatSchema=new Schema(
    {
        members:{
            type:Array
        }
    },
    {
        timestamps:true
    }
)

const ChatModel=model('Chat',chatSchema);
export default ChatModel;