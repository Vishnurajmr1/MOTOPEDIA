export interface PostComment {
  body: {
    postId: string;
    body: string;
  };
}

export interface Comments {
  id: string;
  userId: {
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
