import { CommentInterface } from "./comment.interface"
export interface IpostInterface{
    _id:string
    title:string
    image:{
        name:string,
        key:string,
        _id:string
    }
    imageUrl:string,
    authorId:{
        _id:string
        firstName:string,
        lastName:string
    }
    description:string;
    likedBy:any;
    likes:{
        like?:number,
        thumbsUp?:number,
        heart?:number
    }
}

export interface IPost{
        title:string;
        description:string;
        image:File,
        comments?:CommentInterface
}
export interface IEditPost{
    _id: string;
    title?:string;
    description?:string;
    image?:File
}
export interface IReportPost{
    reason:string,
    targetType:string
}
export interface IPostList extends IpostInterface{
    status:string,
    message:string,
    data:[
        IpostInterface
    ]

}