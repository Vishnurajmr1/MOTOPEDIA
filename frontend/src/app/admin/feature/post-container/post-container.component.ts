import { Component, inject } from '@angular/core';
import { AdminService } from '../../data-access/admin.service';
import { IpostInterface } from 'src/app/shared/types/post.Interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-post-container',
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.css'],
})
export class PostContainerComponent {
  protected posts: IpostInterface[] = [];
  private adminService = inject(AdminService);
  protected postSubject: Subject<IpostInterface[]> = new Subject<
    IpostInterface[]
  >();
  private unsubscribe$: Subject<void> = new Subject<void>();
  ngOnInit(): void {
    this.loadData();
    this.postSubject.pipe(takeUntil(this.unsubscribe$)).subscribe((posts) => {
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private loadData(): void {
    this.adminService
      .getPosts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.posts = res.data;
        this.postSubject.next(this.posts);
      });
  }
}
