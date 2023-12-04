import { addCommentInterface } from "@src/types/commentInterface";
import { comment } from "../models/comment";

export const commentRepositoryMongoDb=()=>{
    const addComment=async(commentInfo:addCommentInterface)=>{
        const newComment=new comment(commentInfo)
        const {_id:commentId}=await newComment.save()
        return commentId;
    }

    const getCommentByPostId=async(postId:string)=>{
        const comments=await comment.find({postId});
        return comments;
    }

    return{
        addComment,
        getCommentByPostId
    }
}

export type CommentRepositoryMongoDbInterface=typeof commentRepositoryMongoDb;