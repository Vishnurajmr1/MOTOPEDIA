import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  IReportPost,
  IpostInterface,
  reportPostList,
} from 'src/app/shared/types/post.Interface';

export interface DisplayPost {
  title: string;
  author: string;
  image: string;
  likes: number;
  reportCount: number;
  blocked: boolean;
  id:string;
}
@Component({
  selector: 'report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.css'],
})
export class ReportTableComponent {
  @Input() reportedposts: reportPostList[] = [];
  @Output() postStatusToggled: EventEmitter<{
    postId: string;
    blocked: boolean;
  }> = new EventEmitter<{ postId: string; blocked: boolean }>();
  displayedColumns: string[] = [
    'Title',
    'Author',
    'Image',
    'Likes',
    'ReportCount',
    'Action',
  ];
  dataSource: DisplayPost[] = [];
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.reportedposts);
    this.dataSource = this.reportedposts.map((report) => ({
      title: report.title,
      author: `${report.authorId.firstName}${report.authorId.lastName}`,
      image: report.imageUrl,
      likes: report.likes ?? 0,
      reportCount: report.reportCount ?? 0,
      blocked: report.blocked,
      id:report.postId
    }));
  }

  togglePostStatus(post: DisplayPost) {
    post.blocked = !post.blocked;
    this.postStatusToggled.emit({postId:post.id,blocked:post.blocked})
  }
}
