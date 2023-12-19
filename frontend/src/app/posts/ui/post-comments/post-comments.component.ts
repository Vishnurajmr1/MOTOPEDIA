import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentInterface } from 'src/app/shared/types/comment.interface';
@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCommentsComponent {
  @Input() currentUserId: string | undefined;
  @Input() comments: CommentInterface[] = [];
  @Output() addCommentEvent=new EventEmitter<{
    content:string,
    parentId:string|null
  }>();
  ngOnInit(){
  }
  addComment({
    content,
    parentId,
  }: {
    content: string;
    parentId: string | null;
  }): void {
    this.addCommentEvent.emit({content,parentId})
  }
  getReplies(commentId:string):CommentInterface[]{
    return this.comments.filter((comment)=>comment.parentId===commentId)
    .sort((a,b)=>new Date(a.createdAt).getTime()-new Date(b.createdAt).getTime())
  }
}
