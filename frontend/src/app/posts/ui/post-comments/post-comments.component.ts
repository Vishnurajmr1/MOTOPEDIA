import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommentInterface } from 'src/app/shared/types/comment.interface';
@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCommentsComponent {
  @Input() currentUserId:string|undefined;
  @Input() comments:CommentInterface[]=[];

}
