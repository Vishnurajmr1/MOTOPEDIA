export interface addCommentInterface{
    userId:string|undefined;
    postId:string;
    content:string;
    parentId:string|null;
}