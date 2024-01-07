import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IpostInterface } from 'src/app/shared/types/post.Interface';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent {
  @Input()
  post: IpostInterface|undefined;
  @Input()
  actionType:'edit'|'delete'|undefined
  @Output()
  closeRequest=new EventEmitter<void>();
  @Output()
  deletePost=new EventEmitter<string>();
  closeModal(){
    this.closeRequest.emit();
  }
  deletePostById(postId:string|undefined){
    this.deletePost.emit(postId)
  }
}
