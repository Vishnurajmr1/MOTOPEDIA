import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { PostService } from '../../data-access/post.service';
import { IpostInterface } from 'src/app/shared/types/post.Interface';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent implements OnInit {
  private postService = inject(PostService);
  posts: IpostInterface[] = [];
  ngOnInit(): void {
    this.postService.getAllPost().subscribe((data: any) => {
      this.posts = data.data;
      console.log(this.posts)
    });
  }
}
