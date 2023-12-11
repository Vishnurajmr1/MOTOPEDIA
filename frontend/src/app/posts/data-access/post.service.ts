import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IPost, IpostInterface } from 'src/app/shared/types/post.Interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http: HttpClient = inject(HttpClient);
  private postApi = '/api/posts';
  getAllPost(): Observable<any> {
    return this.http.get(`${this.postApi}/get-all-posts`);
  }
  createPost(postData:IPost){
    const formData:FormData=new FormData();
    formData.append('title',postData.title);
    formData.append('description',postData.description);
    console.log(postData.image)
    formData.append('files',postData.image);
    console.log(postData)
    return this.http.post(`${this.postApi}/`,formData)
  }
}
