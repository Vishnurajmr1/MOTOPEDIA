import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject } from 'rxjs';
import {State, getCurrentUserData, isUserLoggedIn } from '../../auth/data-access/state';
import { ICurrentUser } from '../../auth/data-access/state/auth.reducer';
import { CommentInterface } from '../../shared/types/comment.interface';
import { IEditPost, IPost, IPostList, IReportPost, IpostInterface } from '../../shared/types/post.Interface';

interface comments {
  status: string;
  message: string;
  comments: any[];
}
@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http: HttpClient = inject(HttpClient);
  currentUser$!: Observable<ICurrentUser>;
  isUserLoggedIn$!: Observable<boolean>;

  constructor(private store: Store<State>,private router:Router) {
    this.currentUser$ = this.store.select(getCurrentUserData);
    this.isUserLoggedIn$ = this.store.select(isUserLoggedIn);
  }
  private postApi = '/api/posts';
  getAllPost(): Observable<any> {
    return this.http.get(`${this.postApi}/get-all-posts`);
  }
  likeThePost(data: any): Observable<any> {
    return this.http.put(`${this.postApi}/like-post`, data);
  }
  createPost(postData: IPost) {
    const formData: FormData = new FormData();
    formData.append('title', postData.title);
    formData.append('description', postData.description);
    formData.append('files', postData.image);
    return this.http.post(`${this.postApi}/`, formData);
  }
  getComments(postId: string): Observable<comments> {
    return this.http.get<comments>(
      `${this.postApi}/get-all-comments/${postId}`
    );
  }
  createComment(postId:string|null,commentDate:{content:string,parentId:string|null}):Observable<CommentInterface>{
    return this.http.post<CommentInterface>(`${this.postApi}/add-comment`,{postId,...commentDate})
  }
  getPostByUser():Observable<IPostList>{
    return this.http.get<IPostList>(`${this.postApi}/get-post-by-user`)
  }
  deletePostByUser(postId:string):Observable<any>{
    return this.http.delete<any>(`${this.postApi}/delete-post/${postId}`)
  }
  updatePostByUser(post:IEditPost):Observable<any>{
    return this.http.put(`${this.postApi}/edit-post/${post._id}`,post)
  }
  reportPostByUser(postId:string,post:IReportPost):Observable<any>{
    return this.http.post(`${this.postApi}/report/${postId}`,post)
  }
  savePostByUser(postId:string):Observable<any>{
    return this.http.patch(`${this.postApi}/save-post/${postId}`,{});
  }
}
