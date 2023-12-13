import { HttpClient } from "@angular/common/http";
import {Injectable,inject} from '@angular/core';
import { Observable } from "rxjs";
@Injectable({
    providedIn:'root'
})
export class userService{
    private http:HttpClient=inject(HttpClient);
    private userApi='/api/user';
    
}