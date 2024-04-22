import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IPost,
  IReportPost,
  IpostInterface,
} from '../../../../app/shared/types/post.Interface';
import { PostService } from '../../data-access/post.service';
import { Observable, of, switchMap } from 'rxjs';
import { UserService } from '../../../../app/riders/data-access/user.service';
import { SnackbarService } from '../../../../app/shared/data-access/global/snackbar.service';
import { CommentInterface } from '../../../../app/shared/types/comment.interface';
import { notificationService } from '../../../../app/shared/data-access/global/notification.service';
import { IAddNotification } from '../../../../app/shared/types/notification.interface';
import { NotificationActionType } from '../../../../app/shared/types';
import { ChatApiService } from 'src/app/chats/data-access/chatApi.service';
import { IUserDetails } from 'src/app/shared/types/user.Interface';
import { ChatListItemInterface } from 'src/app/shared/types/chat.Interface';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
  private router = inject(Router);
  private postService = inject(PostService);
  private userService = inject(UserService);
  private snackbar = inject(SnackbarService);
  private chatService = inject(ChatApiService);
  private notificationService = inject(notificationService);
  posts: IpostInterface[] = [];
  Post: IpostInterface | undefined;
  isCreatePostVisible = false;
  selectedPostId: string | null = null;
  sharePostId: string | null = null;
  selectedPostComments: CommentInterface[] = [];
  CurrentUserChats: IUserDetails[] = [];
  currentUser: string | undefined;
  isUserFollowed: boolean = false;
  openShareModal: boolean = false;
  ngOnInit(): void {
    this.postService.getPostByFollowers().pipe(switchMap((data)=>{
      if(data.data.length===0){
        return this.postService.getAllPost()
      }else{
        return of(data.data)
      }
    })).
    subscribe((posts) => {
      if(Array.isArray(posts)){
        this.posts = posts;
      }else if(posts.data && Array.isArray(posts.data)){
        this.posts=posts.data;
      }
    });
    this.postService.currentUser$.subscribe((user) => {
      this.currentUser = user.userId;
    });
    this.chatService.getUserChats().subscribe((res) => {
      console.log(res);
      this.CurrentUserChats = res.data.map((item:ChatListItemInterface)=>item.participants.filter(
        (participent: IUserDetails) =>
          participent._id.toString() !== this.currentUser
      ));
      console.log(this.CurrentUserChats)
    });
  }
  showCreatePost(): void {
    this.isCreatePostVisible = !this.isCreatePostVisible;
  }
  like(data: { postId: string; reactionType: string }) {
    let notificationData: IAddNotification;
    this.postService.likeThePost(data).subscribe((res) => {
      console.log(res)
      const postId = data.postId;
      const updatedLikeCount = res.data.post.likes.like;
      const currentUser = res.data.userId;
      const postIndex = this.posts.findIndex((post) => post._id === postId);
      if (postIndex !== -1) {
        this.posts[postIndex].likes.like = updatedLikeCount;
        const notificationData: IAddNotification = {
          postId: postId,
          recipient: this.posts[postIndex].authorId._id,
          actionType: NotificationActionType.LIKE,
        };
        this.notificationService
          .createNotification(notificationData)
          .subscribe((res) => {
            console.log(res);
          });
      }
    });
  }
  createPost(data: IPost) {
    this.postService.createPost(data).subscribe({
      next: (res) => {
        console.log(res);
        this.snackbar.showSuccess('Post created Successfully');
        // this.posts=[...res.data,this.posts]
        window.location.reload();
      },
    });
  }
  editPost(data: IPost) {
    //
  }
  follow(data: string) {
    this.userService.followUser(data).subscribe({
      next: (res) => {
        this.snackbar.showSuccess('User Followed Successfully');
      },
    });
  }
  savePost(postId: string) {
    this.postService.savePostByUser(postId).subscribe({
      next: (res) => this.snackbar.showSuccess('Item saved'),
      error: (err) =>
        this.snackbar.showError(`something went wrong while saving..`),
    });
  }
  handleReport(reportData: IReportPost, postId: string) {
    this.postService.reportPostByUser(postId, reportData).subscribe({
      next: (res) => this.snackbar.showSuccess('Post reported successfully'),
      error: (err) =>
        this.snackbar.showError(
          'Something went wrong while reporting the post'
        ),
    });
  }

  showComment(postId: string) {
    this.selectedPostId = postId;
    this.postService.getComments(postId).subscribe((res) => {
      this.selectedPostComments = res.data
    });
  }
  onAddComment(commentData: {
    content: string;
    parentId: string | null;
  }): void {
    const postId = this.selectedPostId;
    console.log(postId,commentData)
    this.postService
      .createComment(postId, commentData)
      .subscribe((createComment) => {
        this.selectedPostComments = [
          createComment.data,
          ...this.selectedPostComments,
        ];
      });
  }
  getSharePost(post: IpostInterface) {
    console.log(post);
    this.Post = post;
    this.sharePostId = this.Post._id;
    this.openShareModal = true;
    console.log(this.Post, this.sharePostId);
  }
}
