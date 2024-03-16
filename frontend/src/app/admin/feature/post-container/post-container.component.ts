import { Component, inject } from '@angular/core';
import { AdminService } from '../../data-access/admin.service';
import { IpostInterface } from 'src/app/shared/types/post.Interface';

@Component({
  selector: 'app-post-container',
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.css'],
})
export class PostContainerComponent {
  protected posts: IpostInterface[] = [];
  private adminService = inject(AdminService);
  ngOnInit(): void {
    this.adminService.getPosts().subscribe((res)=>{
      this.posts=res;
    })
  }
}
