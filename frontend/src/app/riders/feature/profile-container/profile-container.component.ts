import { Component, inject } from '@angular/core';
import {
  IFollowersDetails,
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
  profile!: UserDoc;
  followersDetails: IFollowersDetails | undefined;
  followersLength: number | undefined;
  followingLength: number | undefined;
  posts: IpostInterface|undefined;
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
        this.posts=res;
        console.log(res)
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
