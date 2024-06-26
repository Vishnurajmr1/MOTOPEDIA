interface FileSchema {
    key: string;
    name: string;
    url?: string;
}
interface likes {
    thumbsUp: number | undefined;
    like: number | undefined;
    heart: number | undefined;
}
interface likedBy {
    userId: string;
    reactionType: string;
}

export interface AddPostInterface {
    title: string;
    description: string;
    authorId: string;
    image: FileSchema;
    tags?: string[];
}

export interface EditPostInterface {
    title?: string;
    description?: string;
    image?: FileSchema;
    authorId?: string;
    likedBy?: likedBy[];
    likes?: likes;
    saved?: string[];
    tags?: string[];
    blocked?: boolean;
}

export interface postInterface extends AddPostInterface {
    imageUrl: string;
    likes?: likes;
    likedBy?: likedBy[];
    savedPosts?: string[];
    tags?: string[];
    blocked:boolean;
}
