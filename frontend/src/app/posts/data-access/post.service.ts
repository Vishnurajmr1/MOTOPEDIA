import { HttpClient } from "@angular/common/http";
import { Injectable,inject } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class PostService{
    private http:HttpClient=inject(HttpClient);
    private postApi='/api/posts';

    getAllPost():Observable<any>{
        return this.http.get(`${this.postApi}/get-all-posts`)
    }
}