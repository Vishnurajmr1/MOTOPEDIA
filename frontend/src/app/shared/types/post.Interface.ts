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
    likes:{
        like?:number,
        thumbsUp?:number,
        heart?:number
    }
    currentUserLiked?:string;
}

export interface IPost{
        title:string;
        description:string;
        image:File,
}