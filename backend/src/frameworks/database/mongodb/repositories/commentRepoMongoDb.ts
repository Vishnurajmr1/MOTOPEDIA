import { addCommentInterface } from "../../../../types/commentInterface";
import { comment } from "../models/comment";

export const commentRepositoryMongoDb=()=>{
    const addComment=async(commentInfo:addCommentInterface)=>{
        const newComment=new comment(commentInfo)
        const commentData=await newComment.save().then(comment=>comment.populate('userId'))
        return commentData;
    }

    const getCommentByPostId=async(postId:string)=>{
        const comments=await comment.find({postId}).populate('userId');
        return comments;
    }

    return{
        addComment,
        getCommentByPostId
    }
}

export type CommentRepositoryMongoDbInterface=typeof commentRepositoryMongoDb;