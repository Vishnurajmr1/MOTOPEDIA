import { Component, inject } from '@angular/core';
import { UserDoc } from 'src/app/shared/types/user.Interface';
import { UserService } from '../../data-access/user.service';

@Component({
  selector: 'app-profile-container',
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.css']
})
export class ProfileContainerComponent {
  profile: UserDoc|undefined;
  private userService=inject(UserService);
  ngOnInit():void{
    this.userService.getUserById().subscribe({
      next:(res)=>{
        console.log(res)
        this.profile=res.userDetails;
        console.log(this.profile)
      }
    }
    )
  }
}
