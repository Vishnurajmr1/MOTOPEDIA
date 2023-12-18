import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommentInterface } from 'src/app/shared/types/comment.interface';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css'],
})
export class PostCommentComponent {
  @Input() comment!:CommentInterface;
}
