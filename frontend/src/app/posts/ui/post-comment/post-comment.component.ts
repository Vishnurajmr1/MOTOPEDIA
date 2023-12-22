import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ActiveCommentInterface } from 'src/app/shared/types/activeComment.interface';
import { ActiveCommentTypeEnum } from 'src/app/shared/types/activeCommentType.enum';
import { CommentInterface } from 'src/app/shared/types/comment.interface';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css'],
})
export class PostCommentComponent {
  @Input() comment!: CommentInterface;
  @Input() currentUserId: string | undefined;
  @Input() replies!: CommentInterface[];
  @Input() activeComment!: ActiveCommentInterface | null;
  @Input() parentId!: string | null;
  @Output() addComment = new EventEmitter<{
    content: string;
    parentId: string | null;
  }>();
  @Output() setActiveComment =
    new EventEmitter<ActiveCommentInterface | null>();

  createdAt: string = '';
  canReply: boolean = false;
  canEdit: boolean = false;
  canDelete: boolean = false;
  activeCommentType = ActiveCommentTypeEnum;
  replyId: string | null = null;

  ngOnInit(): void {
    console.log(this.currentUserId)
    const fiveMinutes = 300000;
    const timePassed =
      new Date().getMilliseconds() -
        new Date(this.comment.createdAt).getMilliseconds() >
      fiveMinutes;
    this.canReply = Boolean(this.currentUserId);
    console.log(this.canReply)
    this.canEdit = this.currentUserId === this.comment.userId.id && !timePassed;
    this.canDelete =
      this.currentUserId === this.comment.userId.id &&
      this.replies.length === 0 &&
      !timePassed;
    this.replyId = this.parentId ? this.parentId : this.comment.id;
  }
  isReplying(): boolean {
    if (!this.activeComment) {
      return false;
    }
    return false;
  }
}
