import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IPost, IpostInterface } from 'src/app/shared/types/post.Interface';
import { PostService } from '../../data-access/post.service';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/riders/data-access/user.service';
import { initFlowbite } from 'flowbite';
import { SnackbarService } from 'src/app/shared/data-access/global/snackbar.service';
import { CommentInterface } from 'src/app/shared/types/comment.interface';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
  private router = inject(Router);
  private postService = inject(PostService);
  private userService=inject(UserService)
  private snackbar = inject(SnackbarService);
  posts: IpostInterface[] = [];
  isCreatePostVisible = false;
  selectedPostId: string | null = null;
  selectedPostComments: CommentInterface[] = [];
  currentUser: string | undefined;
  isUserFollowed:boolean=false;
  ngOnInit(): void {
    this.postService.getAllPost().subscribe((data: any) => {
      this.posts = data.data;
    });
    this.postService.currentUser$.subscribe((user) => {
      this.currentUser = user.userId;
    });
  }
  showCreatePost(): void {
    this.isCreatePostVisible = !this.isCreatePostVisible;
  }
  like(data: { postId: string; reactionType: string }) {
    this.postService.likeThePost(data).subscribe((res) => {
      const postId = data.postId;
      const updatedLikeCount = res.data.likes.like;
      const currentUser = res.userId;
      const postIndex = this.posts.findIndex((post) => post._id === postId);
      if (postIndex !== -1) {
        this.posts[postIndex].likes.like = updatedLikeCount;
      }
    });
  }
  createPost(data: IPost) {
    this.postService.createPost(data).subscribe({
      next: (res) => {
        console.log(res);
        this.snackbar.showSuccess('Post created Successfully');
        window.location.reload();
      },
    });
  }
  follow(data: string) {
    this.userService.followUser(data).subscribe({
      next:(res)=>{
        console.log(res)
        this.snackbar.showSuccess('User Followed Successfully');
      }
    })
    console.log(data)
  }

  showComment(postId: string) {
    this.selectedPostId = postId;
    console.log(this.currentUser);
    this.postService.getComments(postId).subscribe((res) => {
      this.selectedPostComments = res.comments;
    });
  }
  onAddComment(commentData: {
    content: string;
    parentId: string | null;
  }): void {
    const postId = this.selectedPostId;
    console.log(postId);
    console.log(commentData);
    this.postService
      .createComment(postId,commentData)
      .subscribe((createComment) => {
        this.selectedPostComments = [
          ...this.selectedPostComments,
          createComment.comments,
        ];
      });
  }
}
