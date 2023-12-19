import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommentInterface } from 'src/app/shared/types/comment.interface';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css'],
})
export class PostCommentComponent {
  @Input() comment!: CommentInterface;
  @Input() currentUserId: string|undefined;
  @Input() replies!: CommentInterface[];

  createdAt: string = '';
  canReply: boolean = false;
  canEdit: boolean = false;
  canDelete: boolean = false;

  ngOnInit(): void {
    const fiveMinutes = 300000;
    const timePassed =
      new Date().getMilliseconds() -
        new Date(this.comment.createdAt).getMilliseconds() >
      fiveMinutes;
    this.canReply = Boolean(this.currentUserId);
    this.canEdit = this.currentUserId === this.comment.userId.id && !timePassed;
    this.canDelete =
      this.currentUserId === this.comment.userId.id &&
      this.replies.length === 0 &&
      !timePassed;
  }
}
