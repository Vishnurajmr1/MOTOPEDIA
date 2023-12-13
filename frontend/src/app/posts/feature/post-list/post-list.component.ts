import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IPost, IpostInterface } from 'src/app/shared/types/post.Interface';
import { PostService } from '../../data-access/post.service';
import { Observable } from 'rxjs';
import { initFlowbite } from 'flowbite';
import { SnackbarService } from 'src/app/shared/data-access/global/snackbar.service';

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
  ngOnInit(): void {
    this.postService.getAllPost().subscribe((data: any) => {
      this.posts = data.data;
    });
  }
  showCreatePost(): void {
    this.isCreatePostVisible = !this.isCreatePostVisible;
  }
  like(data: any) {
    console.log(data);
    this.postService.likeThePost(data).subscribe((res) => {
      console.log(res);
      const postId=data.postId;
      const updatedLikeCount=res.data.likes.like
      const currentUser=res.userId;
      console.log(postId,updatedLikeCount,currentUser)
      const postIndex=this.posts.findIndex((post)=>post._id===postId)
      if(postIndex!==-1){
        this.posts[postIndex].likes.like=updatedLikeCount;
        this.posts[postIndex].currentUserLiked=currentUser;
      }
    });
  }
  createPost(data: IPost) {
    console.log(data);
    this.postService.createPost(data).subscribe({
      next: (res) => {
        console.log(res);
        this.snackbar.showSuccess('Post created Successfully');
        window.location.reload();
      },
    });
  }
  follow(data:any){
    
  }
}
