import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IpostInterface } from 'src/app/shared/types/post.Interface';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent {

title:string=''
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
  updateField(field:string){
    console.log(field)
    // return field;
  }
}
