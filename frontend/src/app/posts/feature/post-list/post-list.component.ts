import { ChangeDetectionStrategy, Component ,inject} from '@angular/core';
import { PostService } from '../../data-access/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class PostListComponent {
  private postService=inject(PostService);
  posts=this.postService.getAllPost().subscribe({
    next:(res)=>{
      console.log(res)
    }
  })
}
