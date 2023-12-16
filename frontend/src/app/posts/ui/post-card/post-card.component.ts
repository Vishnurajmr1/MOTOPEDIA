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
  @Output() like = new EventEmitter<{ postId: string; reactionType: string }>();
  @Output() follow = new EventEmitter<any>();
  @Output() comment = new EventEmitter<string>();
  currentUserLiked: boolean = false;
  showComments: boolean = false;
  ngOnInit(){
  }
  ngAfterViewInit() {
    console.log(this.post);
    this.currentUserLiked ? this.post.currentUserLiked : false;
  }
  addLike(postId: string, reactionType: string) {
    this.currentUserLiked = !this.currentUserLiked;
    this.like.emit({ postId, reactionType });
  }
  followUser(authorId: string) {
    this.follow.emit(authorId);
  }
  showComment(postId: string) {
    this.showComments=!this.showComments;
    if(this.showComments){
      this.comment.emit(postId);
    }
  }
  
}
