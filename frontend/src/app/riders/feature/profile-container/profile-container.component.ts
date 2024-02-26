import { Component, Output, inject } from '@angular/core';
import {
  IFollowersDetails,
  IUpdateProfile,
  IUserInfo,
  UserDoc,
} from '../../../shared/types/user.Interface';
import { UserService } from '../../data-access/user.service';
import { PostService } from '../../../posts/data-access/post.service';
import { ProfileTab } from '../../../shared/types';
import {
  IEditPost,
  IpostInterface,
} from '../../../shared/types/post.Interface';
import { SnackbarService } from '../../../shared/data-access/global/snackbar.service';
import { State, getCurrentUserData } from 'src/app/auth/data-access/state';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-container',
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.css'],
})
export class ProfileContainerComponent {
  showtoggleModal(data: any) {
    this.modalOpen = true;
    this.post = data.post;
    this.actionType = data.actionType;
  }

  profile?: UserDoc;
  followersDetails: IFollowersDetails | undefined;
  followersLength: number | undefined;
  followingLength: number | undefined;
  posts!: IpostInterface[];
  actionType: 'edit' | 'delete' | undefined;
  post: IpostInterface | undefined;
  private userService = inject(UserService);
  private postService = inject(PostService);
  private snakbarService = inject(SnackbarService);
  private store = inject(Store<State>);
  private router = inject(ActivatedRoute);
  id!: string;
  currentUser: any;
  owner: boolean = false;
  followers!:[IUserInfo];
  following!:[IUserInfo];
  closeModal() {
    this.modalOpen = false;
  }
  modalOpen: boolean = false;
  openFollowersModal:boolean=false;
  ngOnInit(): void {
    this.currentUser = this.store.select(getCurrentUserData);
    this.currentUser.subscribe((state: any) => {
      this.id = this.router.snapshot.params['id'] || state?.userId;
      this.userService.getAUser(this.id).subscribe({
        next: (res) => {
          this.profile = res.userDetails;
          if (state.userId === this.profile?._id) {
            this.owner = true;
          }
        },
      });
    });
    this.userService.getConnection(this.id).subscribe({
      next: (res) => {
        this.followersDetails = res;
        this.followersLength =
          this.followersDetails?.connectionData[0].followers.length;
          this.followers=this.followersDetails?.connectionData[0].followers;
        this.followingLength =
          this.followersDetails?.connectionData[0].following.length;
          this.following=this.followersDetails?.connectionData[0].following;
      },
    });
    this.postService.getPostByUser(this.id).subscribe({
      next: (res) => {
        this.posts = res.data;
      },
    });
  }
  profileUpdateForm(formData: IUpdateProfile) {
    this.userService.updateProfile(formData).subscribe({
      next: (res) => {
        window.location.reload();
        this.snakbarService.showSuccess('Profile updated Successfully');
      },
    });
  }
  // delete post
  deletePostById(postId: string) {
    this.postService.deletePostByUser(postId).subscribe({
      next: (res) => {
        console.log(res);
        this.closeModal();
        this.snakbarService.showSuccess('Post deleted Successfully');
        this.posts = this.posts.filter((post) => post._id !== postId);
      },
    });
  }
  //update post
  handleUpdatePost(post: IEditPost) {
    console.log(post);
    this.postService.updatePostByUser(post).subscribe({
      next: (res) => {
        {
          console.log(res);
          this.snakbarService.showSuccess('post updated successfully');
        }
      },
    });
  }

  displayContent: string = 'Profile';
  showProfile() {
    this.displayContent = 'Profile';
  }
  showPosts() {
    this.displayContent = 'Posts';
  }
  showSavedPosts() {
    this.displayContent = 'Saved Posts';
  }
  showFollowersList() {
    this.openFollowersModal=!this.openFollowersModal;
  }
}
