import { Component, Input, SimpleChanges } from '@angular/core';
import { IpostInterface } from 'src/app/shared/types/post.Interface';

export interface DisplayPost {
  title: string;
  author: string;
  image: string;
  likes: string;
}
@Component({
  selector: 'post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.css'],
})
export class PostTableComponent {
  @Input() posts: IpostInterface[] = [];
  displayedColumns: string[] = ['Title', 'Author', 'Image', 'Likes'];
  dataSource: DisplayPost[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.posts)
    this.dataSource = this.posts.map((post) => ({
      title: post.title,
      author: `${post.authorId.firstName}${post.authorId.lastName}`,
      image: post.imageUrl,
      likes: post.likedBy.length ?? 0,
    }));
  }
}
