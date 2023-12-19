export interface CommentInterface {
    comments: CommentInterface;
    id: string;
    parentId:string|null
    userId: {
      id:string
      firstName:string
      lastName:string
      email:string
    };
    postId: string;
    content: string;
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
  }