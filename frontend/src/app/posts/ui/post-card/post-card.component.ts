import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IpostInterface } from 'src/app/shared/types/post.Interface';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent {
  @Input() post!: IpostInterface;
  @Input() currentUser:string|undefined;
  @Output() like = new EventEmitter<{ postId: string; reactionType: string }>();
  @Output() follow = new EventEmitter<string>();
  @Output() comment = new EventEmitter<string>();
  @Output() showComments: boolean = false;
  currentUserLiked:boolean=false;
  currentUserFollowing:boolean=false;
  followButton:boolean=true;
  ngOnInit(){
    if(this.post.authorId._id==this.currentUser){
      this.followButton=false;
    }
    if(this.currentUser!==undefined){
     this.currentUserLiked=this.post.likedBy.some((res: { userId: string | undefined; })=>res.userId===this.currentUser)
    }
  }
  addLike(postId: string, reactionType: string) {
    this.currentUserLiked = !this.currentUserLiked;
    this.like.emit({ postId, reactionType });
  }
  followUser(authorId: string) {
    this.follow.emit(authorId);
    this.currentUserFollowing=!this.currentUserFollowing
  }
  toggleComment(postId: string) {
    this.showComments=!this.showComments;
    if(this.showComments){
      this.comment.emit(postId);
    }
  }
  
}
