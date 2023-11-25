import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { IConfirmPass } from 'src/app/shared/types/user.Interface';
import { CustomValidationService } from '../../data-access/custom-validation.service';

@Component({
  selector: 'app-forgot-form',
  templateUrl: './forgot-form.component.html',
  styleUrls: ['./forgot-form.component.css'],
})
export class ForgotFormComponent {
  @Output() submitForgotForm: EventEmitter<IConfirmPass> = new EventEmitter();
  private fb = inject(FormBuilder);
  private customValidator = inject(CustomValidationService);
  show: boolean = false;
  password() {
    this.show = !this.show;
  }
  forgotForm = this.fb.group(
    {
      password: [
        '',
        Validators.compose([
          Validators.required,
          this.customValidator.patternValidator(),
        ]),
      ],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: this.customValidator.MatchPassword(
        'password',
        'confirmPassword'
      ),
    } as AbstractControlOptions
  );

  get forgotFormControl() {
    return this.forgotForm.controls;
  }
  onSumbit() {
    const url = window.location.pathname;
    const path = url.split('/');
    const token = path[3];
    console.log(token);
    if (this.forgotForm.valid && token) {
      const newPasswordControl = this.forgotForm.get('password');
      if (newPasswordControl && newPasswordControl.value) {
        const data: IConfirmPass = {
          newPassword: newPasswordControl.value,
          token: token,
        };
        this.submitForgotForm.emit(data);
      }
    } else {
      console.log('Oops something went wrong!Please try again later');
    }
  }
}
