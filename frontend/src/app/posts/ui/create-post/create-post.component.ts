import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/shared/data-access/global/snackbar.service';
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
  private snackbar=inject(SnackbarService)

  postForm = this.fb.group({
    title: ['', [Validators.required,UtilsService.noWhiteSpaceValidator()]],
    description: ['', [Validators.required,UtilsService.noWhiteSpaceValidator()]],
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
  }

  fileChangeEvent(event: any) {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        console.log(file);
        const validateError=this._utlis.imageValidator(file)
        if(validateError){
          this.snackbar.showError(validateError)
          console.error(validateError);
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          this.image = file;
          if(this.image){
            this.showImage=reader.result as string;
          }

        };
        reader.readAsDataURL(file);
      }
  }
  closeModal(){
    this.isVisible=false;
  }
}
