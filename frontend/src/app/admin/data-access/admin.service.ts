import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IEditPost,
  IPostList,
  IpostInterface,
} from 'src/app/shared/types/post.Interface';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private http = inject(HttpClient);

  getUsers() {
    return this.http.get('/api/user/get-all-users');
  }
  blockUser(userId: string, reason: string) {
    return this.http.patch(`/api/user/block-user/${userId}`, { reason });
  }
  unblockUser(userId: string) {
    return this.http.patch(`/api/user/unblock-user/${userId}`, {});
  }
  getPosts(): Observable<IPostList> {
    return this.http.get<IPostList>('/api/posts/get-all-posts');
  }
  getReportedPosts(): Observable<any> {
    return this.http.get(`api/posts/get-reported-posts`);
  }
  BlockPost(postId: string, updatedPost: IEditPost) {
    return this.http.put(`api/posts/edit-post/${postId}`,updatedPost);
  }
}
