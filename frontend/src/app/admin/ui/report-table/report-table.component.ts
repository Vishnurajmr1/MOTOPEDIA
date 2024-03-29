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
  likes: number;
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
      title: report.title,
      author: `${report.authorId.firstName}${report.authorId.lastName}`,
      image: report.imageUrl,
      likes: report.likes ?? 0,
      reportCount: report.reportCount ?? 0,
    }));
  }
}
