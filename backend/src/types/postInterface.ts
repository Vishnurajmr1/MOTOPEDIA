interface FileSchema {
    key: string;
    name: string;
    url?: string;
}
interface likes {
    thumbsUp: number;
    like: number;
    heart: number;
}

export interface AddPostInterface {
    title: string;
    description: string;
    authorId: string;
    image: FileSchema;
}
export interface EditPostInterface {
    title?: string;
    description?: string;
    image?: FileSchema;
    authorId?: string;
    likedBy?: [{userId:string,reactionType:string}];
    likes?: likes;
    // reactionType: string;
}

export interface postInterface extends AddPostInterface {
    imageUrl: string;
}
