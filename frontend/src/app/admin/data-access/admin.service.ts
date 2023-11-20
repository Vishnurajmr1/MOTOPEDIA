import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class AdminService{
    private http=inject(HttpClient)
    
    getUsers(){
        return this.http.get('/api/user/get-all-users');
    }
}