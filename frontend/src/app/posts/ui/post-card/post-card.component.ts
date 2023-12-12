import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IpostInterface } from 'src/app/shared/types/post.Interface';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent {
  @Input() post!: IpostInterface;
  @Output() like=new EventEmitter<{postId:string,reactionType:string}>;
  ngAfterViewInit(){
    console.log(this.post);
  }
  addLike(postId:string,reactionType:string){
    this.like.emit({postId,reactionType});
  }
}
