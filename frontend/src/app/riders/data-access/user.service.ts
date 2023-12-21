import { HttpClient } from "@angular/common/http";
import {Injectable,inject} from '@angular/core';
import { Observable } from "rxjs";
@Injectable({
    providedIn:'root'
})
export class UserService{
    private http:HttpClient=inject(HttpClient);
    private userApi='/api/user';

    getUserById():Observable<any>{
        return this.http.get(`${this.userApi}/get-user-details`)
    }
    followUser(authorId:string):Observable<any>{
        return this.http.post(`${this.userApi}/follow/${authorId}`,{})
    }
    
}