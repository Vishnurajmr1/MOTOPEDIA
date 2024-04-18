export interface CommentInterface {
  _id: string;
  parentId: null | string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  postId: string;
  content: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: Date;
}
