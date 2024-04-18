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
    console.log(this.replies)
    const fiveMinutes = 5*60*1000;
    const currentTime=new Date().getTime();
    const commentTime=new Date(this.comment.createdAt).getTime()
    const timePassed=currentTime-commentTime>fiveMinutes
      console.log(this.currentUserId)
    this.canReply = Boolean(this.currentUserId);
    this.canEdit = this.currentUserId === this.comment.userId._id && !timePassed;
    this.canDelete =
      this.currentUserId === this.comment.userId._id &&
      this.replies.length === 0 &&
      !timePassed;
    }
    isReplying(): boolean {
    this.replyId = this.parentId ? this.parentId : this.comment._id;
    console.log(this.activeComment)
    if (!this.activeComment) {
      return false;
    }
    // return false
    return (
      this.activeComment.id===this.comment._id 
      &&
      this.activeComment.type===this.activeCommentType.replying
    );
  }
  closeCommentForm(){
    this.activeComment=null;
  }
}
