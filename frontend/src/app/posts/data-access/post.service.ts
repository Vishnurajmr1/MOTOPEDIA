import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject } from 'rxjs';
import {State, getCurrentUserData, isUserLoggedIn } from '../../auth/data-access/state';
import { ICurrentUser } from '../../auth/data-access/state/auth.reducer';
import { IEditPost, IPost, IPostList, IReportPost, IpostInterface } from '../../shared/types/post.Interface';
import { IApiResponse } from '../../../app/shared/types/response.interface';
import { environment } from '../../../environments/environment';

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
  private postApi = `${environment.apiUrl}/posts`;
  getAllPost(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`${this.postApi}/get-all-posts`);
  }
  getPostByFollowers():Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${this.postApi}/get-followers-post`)
  }
  likeThePost(data: any): Observable<IApiResponse> {
    return this.http.put<IApiResponse>(`${this.postApi}/like-post`, data);
  }
  createPost(postData: IPost):Observable<IApiResponse> {
    const formData: FormData = new FormData();
    formData.append('title', postData.title);
    formData.append('description', postData.description);
    formData.append('files', postData.image);
    return this.http.post<IApiResponse>(`${this.postApi}/`, formData);
  }
  getComments(postId: string): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(
      `${this.postApi}/get-all-comments/${postId}`
    );
  }
  createComment(postId:string|null,commentDate:{content:string,parentId:string|null}):Observable<IApiResponse>{
    return this.http.post<IApiResponse>(`${this.postApi}/add-comment`,{postId,...commentDate})
  }
  getPostByUser(userId: string | null = null):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${this.postApi}/get-post-by-user?Id=${userId || ''}`)
  }
  deletePostByUser(postId:string):Observable<IApiResponse>{
    return this.http.delete<IApiResponse>(`${this.postApi}/delete-post/${postId}`)
  }
  updatePostByUser(post:IEditPost):Observable<IApiResponse>{
    return this.http.put<IApiResponse>(`${this.postApi}/edit-post/${post._id}`,post)
  }
  reportPostByUser(postId:string,post:IReportPost):Observable<IApiResponse>{
    return this.http.post<IApiResponse>(`${this.postApi}/report/${postId}`,post)
  }
  savePostByUser(postId:string):Observable<IApiResponse>{
    return this.http.patch<IApiResponse>(`${this.postApi}/save-post/${postId}`,{});
  }
}
