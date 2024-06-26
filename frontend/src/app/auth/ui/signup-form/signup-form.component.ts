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
import { ISignUp } from 'src/app/shared/types/user.Interface';
// import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { LocalStorageService } from 'src/app/shared/data-access/global/local-storage.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('buttonState', [
      state(
        'valid',
        style({
          backgroundColor: 'green',
          color: 'white',
          transform: 'translateY(10px)', // Adjust the value as needed
        })
      ),
      transition('* => valid', [animate('0.3s')]),
    ]),
  ],
})
export class SignupFormComponent {
  constructor(private router: Router) {}
  @Output() submitSignupForm: EventEmitter<ISignUp> = new EventEmitter();
  private fb = inject(FormBuilder);
  private customValidator = inject(CustomValidationService);
  private localStorageService = inject(LocalStorageService);
  show: boolean = false;
  password() {
    this.show = !this.show;
  }
  registerForm = this.fb.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
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

  get registerFormControl() {
    return this.registerForm.controls;
  }
  onSubmit() {
    if (this.registerForm.valid) {
      this.localStorageService.setOtpVerifyTimeLimitToken();
      this.submitSignupForm.emit(this.registerForm.value as ISignUp);
    }
  }
  loginWithGoogle(): void {
    // this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
    // .then(()=>this.router.navigate(['auth']));
  }
}
