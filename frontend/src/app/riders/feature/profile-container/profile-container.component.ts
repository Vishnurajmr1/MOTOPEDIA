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
import { State, getCurrentUserData } from '../../../../app/auth/data-access/state';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

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
  currentUserSubscription!:Subscription
  userServiceSubscription!:Subscription
  postServiceSubscription!:Subscription
  ngOnInit(): void {
    this.currentUser = this.store.select(getCurrentUserData);
   this.currentUserSubscription=this.currentUser.subscribe((state: any) => {
      this.id = this.router.snapshot.params['id'] || state?.userId;
      this.userService.getAUser(this.id).subscribe({
        next: (res) => {
          this.profile = res.data;
          if (state.userId === this.profile?._id) {
            this.owner = true;
          }
        },
      });
    });
    this.userServiceSubscription=this.userService.getConnection(this.id).subscribe({
      next: (res) => {
        this.followersDetails = res;
        this.followersLength =
          this.followersDetails?.data[0].followers.length||0;
          this.followers=this.followersDetails?.data[0].followers||[];
        this.followingLength =
          this.followersDetails?.data[0].following.length||0;
          this.following=this.followersDetails?.data[0].following||[];
      },
    });
    this.postServiceSubscription=this.postService.getPostByUser(this.id).subscribe({
      next: (res) => {
        this.posts = res.data;
      },
    });
  }
  profileUpdateForm(formData: IUpdateProfile) {
    this.userServiceSubscription=this.userService.updateProfile(formData).subscribe({
      next: (res) => {
        console.log(res)
        window.location.reload();
        this.snakbarService.showSuccess('Profile updated Successfully');
      },
    });
  }
  // delete post
  deletePostById(postId: string) {
   this.postServiceSubscription= this.postService.deletePostByUser(postId).subscribe({
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
   this.postServiceSubscription= this.postService.updatePostByUser(post).subscribe({
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
  ngOnDestroy(): void {
    if(this.userServiceSubscription){
      this.userServiceSubscription.unsubscribe()
    }
    if(this.postServiceSubscription){
      this.postServiceSubscription.unsubscribe()
    }
    if(this.currentUserSubscription){
      this.currentUserSubscription.unsubscribe()
    }
  }
}

