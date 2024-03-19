import { Component, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IpostInterface, reportPostList } from 'src/app/shared/types/post.Interface';
import { AdminService } from '../../data-access/admin.service';

@Component({
  selector: 'app-report-post-container',
  templateUrl: './report-post-container.component.html',
  styleUrls: ['./report-post-container.component.css']
})
export class ReportPostContainerComponent {
  protected reportedPosts: reportPostList[] = [];
  private adminService = inject(AdminService);
  protected postSubject: Subject<reportPostList[]> = new Subject<
    reportPostList[]
  >();
  private unsubscribe$: Subject<void> = new Subject<void>();
  ngOnInit(): void {
    this.loadData();
    this.postSubject.pipe(takeUntil(this.unsubscribe$)).subscribe((posts) => {
      this.reportedPosts = posts;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private loadData(): void {
    this.adminService
      .getReportedPosts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.reportedPosts = res.data;
        this.postSubject.next(this.reportedPosts);
      });
  }
}
