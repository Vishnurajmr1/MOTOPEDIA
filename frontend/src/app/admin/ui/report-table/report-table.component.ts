import { Component, Input, SimpleChanges } from '@angular/core';
import {
  IReportPost,
  IpostInterface,
  reportPostList,
} from 'src/app/shared/types/post.Interface';

export interface DisplayPost {
  title: string;
  author: string;
  image: string;
  likes: string;
  reportCount: number;
}
@Component({
  selector: 'report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.css'],
})
export class ReportTableComponent {
  @Input() reportedposts: reportPostList[] = [];
  displayedColumns: string[] = [
    'Title',
    'Author',
    'Image',
    'Likes',
    'ReportCount',
  ];
  dataSource: DisplayPost[] = [];
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.reportedposts);
    this.dataSource = this.reportedposts.map((report) => ({
      title: report.posts[0].title,
      author: `${report.posts[0].authorId.firstName}${report.posts[0].authorId.lastName}`,
      image: report.posts[0].imageUrl,
      likes: report.posts[0].likedBy.length ?? 0,
      reportCount: report.posts[0].reportCount ?? 0,
    }));
  }
}
