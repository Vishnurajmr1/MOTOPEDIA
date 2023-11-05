import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  AbstractControlOptions,
} from '@angular/forms';
import { CustomValidationService } from '../../data-access/custom-validation.service';
import { ISignUp } from 'src/app/shared/interfaces/Interface';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupFormComponent {
  @Output() submitSignupForm: EventEmitter<ISignUp> = new EventEmitter();
  private fb = inject(FormBuilder);
  private customValidator = inject(CustomValidationService);

  registerForm = this.fb.group(
    {
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        Validators.compose([
          Validators.required,
          this.customValidator.patternValidator(),
        ]),
      ],
      confirmPassword: ['', Validators.required],
    },
    {
      Validator: this.customValidator.MatchPassword(
        'password',
        'confirmPassword'
      ),
    } as AbstractControlOptions
  );

  get registerFormControl(){
    return this.registerForm.controls;
  }

  onSumbit(){
    if(this.registerForm.valid){
      this.submitSignupForm.emit(this.registerForm.value as ISignUp);
    }
  }
}
