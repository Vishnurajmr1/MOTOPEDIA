import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { IUpdateProfile, UserDoc } from '../../../shared/types/user.Interface';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomValidationService } from '../../../auth/data-access/custom-validation.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent {
  @Input() userData: UserDoc | undefined;
  @Output() userUpdateForm: EventEmitter<IUpdateProfile> = new EventEmitter();
  private fb = inject(FormBuilder);
  imagePreview:string='';
  private customValidator = inject(CustomValidationService);
  profileUpdateForm!: FormGroup;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userData'] && changes['userData'].currentValue) {
      this.updateFormValues();
    }
  }
  ngOnInit(): void {
    this.profileUpdateForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: ['',[Validators.email]],
      mobile: [''],
      currentPassword: ['', Validators.required],
      profilePic: [''],
      password: ['', Validators.compose([this.customValidator.patternValidator()])],
      confirmPassword: [''],
    },
    {
      validators: this.customValidator.MatchPassword('password', 'confirmPassword'),
    });

    console.log(this.userData);
  }

  updateFormValues(): void {
    if(this.userData){
      this.profileUpdateForm?.patchValue({
        firstName: this.userData?.firstName,
        lastName: this.userData?.lastName,
        email: this.userData?.email,
        mobile: this.userData?.mobile
      });
    }
   
  }
get formControl(){
  return this.profileUpdateForm.controls;
}
  onFileChange(event:any){
    const file=event.target.files[0];
    if(file){
      console.log(file)
      this.profileUpdateForm.patchValue({
        profilePic:file
      });
      this.previewImage(file)
    }
  }
  previewImage(file:File){
    const reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onload=()=>{
      this.imagePreview=reader.result as string;
    }
  }

  onSubmit() {
    console.log(this.profileUpdateForm);
    console.log(this.userData);
    // if (this.profileUpdateForm.valid) {
      console.log(this.profileUpdateForm.value)
      this.userUpdateForm.emit(this.profileUpdateForm.value as IUpdateProfile);
  }

  closeModal() {
    this.openModal = false;
  }
  openModal = true;
}
