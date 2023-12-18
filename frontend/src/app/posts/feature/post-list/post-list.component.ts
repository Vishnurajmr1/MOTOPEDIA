import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IPost, IpostInterface } from 'src/app/shared/types/post.Interface';
import { PostService } from '../../data-access/post.service';
import { Observable } from 'rxjs';
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
  private snackbar = inject(SnackbarService);
  posts: IpostInterface[] = [];
  isCreatePostVisible = false;
  selectedPostId: string | null = null;
  selectedPostComments: CommentInterface[] = [];
 currentUser:string | undefined
  ngOnInit(): void {
    this.postService.getAllPost().subscribe((data: any) => {
      this.posts = data.data;
      this.postService.currentUser$.subscribe((user)=>{
        this.currentUser=user.userId;
      })
      console.log(this.currentUser)
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
        this.posts[postIndex].currentUserLiked = currentUser;
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
  follow(data: any) {}

  showComment(postId: string) {
    this.selectedPostId = postId;
    console.log(this.currentUser)
    this.postService.getComments(postId).subscribe((res) => {
      this.selectedPostComments = res.comments;
    });
  }
}
