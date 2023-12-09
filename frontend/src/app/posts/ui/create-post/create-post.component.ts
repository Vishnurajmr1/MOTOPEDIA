import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { IPost } from 'src/app/shared/types/post.Interface';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {

  isVisible=true;
closeCreatePost() {
  this.isVisible=false;
}
  @Output() createPostForm:EventEmitter<IPost>=new EventEmitter();

  private fb=inject(FormBuilder);
  createPost=this.fb.group({
    title:['',[Validators.required]],
    description:['',[Validators.required,Validators.minLength]],
    files:[null,[Validators.required]]
  })

  get createFormControl(){
    return this.createPost.controls;
  }
  onSumbit(){
    console.log(this.createPost)
    if(this.createPost.valid){
      this.createPostForm.emit(this.createPost.value  as IPost)
    }
  }

  onFileChange(data: Event) {
    const file=(data?.target as HTMLInputElement).files?.item(0) as File;
    this.createPost.patchValue({
      files:file as any
    })
    }
}
