import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { AdminService } from '../../data-access/admin.service';

@Component({
  selector: 'app-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.css']
})
export class UsersContainerComponent {
  protected users:any;
  private adminService=inject(AdminService)
}
