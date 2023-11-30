import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IpostInterface } from 'src/app/shared/types/post.Interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http: HttpClient = inject(HttpClient);
  private postApi = '/api/posts';
  getAllPost(): Observable<Object> {
    return this.http.get(`${this.postApi}/get-all-posts`);
  }
}
