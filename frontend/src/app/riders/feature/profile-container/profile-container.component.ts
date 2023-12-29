import { Component, inject } from '@angular/core';
import {
  IFollowersDetails,
  UserDoc,
} from 'src/app/shared/types/user.Interface';
import { UserService } from '../../data-access/user.service';

@Component({
  selector: 'app-profile-container',
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.css'],
})
export class ProfileContainerComponent {
  profile: UserDoc | undefined;
  followersDetails: IFollowersDetails | undefined;
  followersLength: number | undefined;
  followingLength: number | undefined;
  private userService = inject(UserService);
  ngOnInit(): void {
    this.userService.getUserById().subscribe({
      next: (res) => {
        this.profile = res.userDetails;
        console.log(this.profile);
      },
    });
    this.userService.getConnection().subscribe({
      next: (res) => {
        this.followersDetails = res;
        this.followersLength =
          this.followersDetails?.connectionData[0].followers.length;
        this.followingLength =
          this.followersDetails?.connectionData[0].following.length;
      },
    });
  }
}
