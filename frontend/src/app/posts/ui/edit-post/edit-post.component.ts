import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IEditPost, IpostInterface } from 'src/app/shared/types/post.Interface';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent {
title:string='';
description:string=''
  @Input()
  post: IpostInterface|undefined;
  @Input()
  actionType:'edit'|'delete'|undefined
  @Output()
  closeRequest=new EventEmitter<void>();
  @Output()
  deletePost=new EventEmitter<string>();
  @Output()
  updatePost:EventEmitter<IEditPost>=new EventEmitter<IEditPost>();
  editableField:string|null=null;
  updatePostDetails!:IEditPost;
  editmode=false;
  ngOnInit(){
   this.updatePostDetails={
    _id:''
   }
  }
  closeModal(){
    this.closeRequest.emit();
  }
  deletePostById(postId:string|undefined){
    this.deletePost.emit(postId)
  }
  enableEdit(field:string){
    this.editableField=field;
    this.editmode=true;
  }
  onFocusOut(){
    if(this.post && this.post._id){
      this.updatePostDetails._id=this.post._id
      if(this.title!=='' && this.editableField==='title'){
        this.updatePostDetails.title=this.title;
        this.post.title=this.title;
      }else if(this.description!=='' && this.editableField==='description'){
        this.updatePostDetails.description=this.description;
        this.post.description=this.description
      }
      this.updatePost.emit(this.updatePostDetails);
    }
    this.disableEdit();
  }
  disableEdit(){
    this.editableField=null;
    this.editmode=false;
  }
}

