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
        firstName:string,
        lastName:string
    }
    description:string;
    likes:number
}