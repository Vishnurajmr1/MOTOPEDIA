import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/shared/data-access/global/utlis.service';
import { IPost } from 'src/app/shared/types/post.Interface';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
  title!:string;
  description!: string;
  image!: File;
  showImage!:string;

  isVisible = true;
  closeCreatePost() {
    this.isVisible = false;
  }
  constructor(private _utlis: UtilsService) {}
  @Output() createPostForm: EventEmitter<IPost> = new EventEmitter();
  private fb = inject(FormBuilder);

  postForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    image: [''],
  });

  get postFormControl() {
    return this.postForm.controls;
  }
  onSumbit() {
    if (this.postForm.valid) {
      if(this.postForm.value.title && this.postForm.value.description){
        const postData:IPost={
          title:this.postForm.value.title,
          description:this.postForm.value.description,
          image:this.image
        }
        this.createPostForm.emit(postData);
      }

    }
    // this.post.data=this._utlis.trimObject(this.post.data);
    // const formData=new FormData();
    // if(this.post.data.title && this.post.data.description){
    //   formData.set('title',this.post.data.title);
    //   formData.set('description',this.post.data.description);
    // }
    // console.log(this.image)
    // if(this.image){
    //   this.post.data.files=this.image;
    // }
    // console.log(this.post.data)
  }

  fileChangeEvent(event: any) {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        console.log(file);
        const reader = new FileReader();
        console.log(reader)
        reader.onload = () => {
          console.log(reader.result)
          this.image = file;
          if(this.image){
            this.showImage=reader.result as string;
          }

        };
        reader.readAsDataURL(file);
      }
  }
}
