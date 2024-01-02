import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { IUpdateProfile, UserDoc } from '../../../shared/types/user.Interface';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidationService } from '../../../auth/data-access/custom-validation.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProfileComponent {
  @Input() userData!:UserDoc;
  @Output() userUpdateForm:EventEmitter<IUpdateProfile> =new EventEmitter();
  private fb=inject(FormBuilder);
  private customValidator=inject(CustomValidationService)

  profileUpdateForm=this.fb.group({
    firstName:[this.userData?.firstName||''],
    lastName:[this.userData?.lastName||''],
    email:[this.userData?.email||''],
    mobile:[this.userData?.mobile||''],
    currentPassword:['',Validators.required],
    profilePic:[''],
    password:['', Validators.compose([this.customValidator.patternValidator()])],
    confirmPassword:['']
  },{
    validators:this.customValidator.MatchPassword('password','confirmPassword')
  }as AbstractControlOptions
  )

  get profileUpdateFormControl(){
    return this.profileUpdateForm.controls;
  }

  onSubmit(){
    console.log(this.profileUpdateForm)
    if(this.profileUpdateForm.valid){
      this.userUpdateForm.emit(this.profileUpdateForm.value as IUpdateProfile)
    }
  }
closeModal() {
  this.openModal=false;
}
  openModal=true
}
