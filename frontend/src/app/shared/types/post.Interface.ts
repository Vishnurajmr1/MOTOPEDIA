export interface IpostInterface{
    _id:string
    title:string
    image:{
        name:string,
        key:string,
        _id:string
    }
    authorId:string
    description:string;
    likes:number
}