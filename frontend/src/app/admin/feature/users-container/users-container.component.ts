import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { AdminService } from '../../data-access/admin.service';
import { UserDoc } from 'src/app/shared/interfaces/Interface';

@Component({
  selector: 'app-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.css'],
})
export class UsersContainerComponent {
  protected users!: UserDoc[];
  private adminService=inject(AdminService);
  ngOnInit(){
    this.adminService.getUsers().subscribe((res:any)=>{
      this.users=res.data;
    })
  }
  unblock(){
    console.log('hii')
  }
}
