interface FileSchema {
    key: string;
    name: string;
    url?: string;
}
interface likes {
    thumbsUp?: number;
    like?: number;
    heart?: number;
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
    likedBy?: string[];
    likes?:likes
}

export interface postInterface extends AddPostInterface {
    imageUrl: string;
}
