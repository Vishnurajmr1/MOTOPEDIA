import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

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
}
