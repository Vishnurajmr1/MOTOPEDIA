import { Component, inject } from '@angular/core';
import {Router} from '@angular/router'
import { IpostInterface } from 'src/app/shared/types/post.Interface';
import { PostService } from '../../data-access/post.service';
import { Observable } from 'rxjs';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  private router=inject(Router)

  private postService = inject(PostService);
  posts: IpostInterface[] = [];
  ngOnInit(): void {
    this.postService.getAllPost().subscribe((data: any) => {
      this.posts = data.data;
    });
  }
  onClickCreatePost() {
    this.router.navigate(['/create']);
  }
}
