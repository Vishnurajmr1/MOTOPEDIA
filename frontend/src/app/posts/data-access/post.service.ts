import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IPost, IpostInterface } from 'src/app/shared/types/post.Interface';

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
}
