import { Component, inject } from '@angular/core';
import {
  IFollowersDetails,
  IUpdateProfile,
  UserDoc,
} from '../../../shared/types/user.Interface';
import { UserService } from '../../data-access/user.service';
import { PostService } from '../../../posts/data-access/post.service';
import { ProfileTab } from '../../../shared/types';
import { IpostInterface } from 'src/app/shared/types/post.Interface';

@Component({
  selector: 'app-profile-container',
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.css'],
})
export class ProfileContainerComponent {

  profile: UserDoc|undefined;
  followersDetails: IFollowersDetails | undefined;
  followersLength: number | undefined;
  followingLength: number | undefined;
  posts!: IpostInterface[];
  private userService = inject(UserService);
  private postService=inject(PostService)
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
    this.postService.getPostByUser().subscribe({
      next:(res)=>{
        console.log(res)
        console.log('hello')
        this.posts=res.data;
      }
    })
  }
  profileUpdateForm(formData: IUpdateProfile) {
    this.userService.updateProfile(formData).subscribe({
      next:(res)=>{
        console.log(res);
        window.location.reload()
        
      }
    })
    }
  displayContent:string='Profile';
  showProfile() {
    this.displayContent='Profile';
      }
    showPosts() {
      this.displayContent='Posts'
    }
    showSavedPosts() {
      this.displayContent='Saved Posts'
    }
  
}
