import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Comments } from 'src/app/shared/types/post-comment';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCommentsComponent {
@Input() comments:Comments[]=[];
}
