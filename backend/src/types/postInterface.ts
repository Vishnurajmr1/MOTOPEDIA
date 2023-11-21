interface FileSchema {
    key: string;
    name: string;
    url?: string;
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
}
