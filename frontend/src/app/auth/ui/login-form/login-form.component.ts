import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ILogin } from 'src/app/shared/types/user.Interface';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations:[
    trigger('buttonState',[
      state('valid',style({
        backgroundColor:'green',
        color:'white',
        transform:'translateY(10px)'
      })),
      transition('*=>valid',[
        animate('0.3s')
      ])
    ])
  ]
})
export class LoginFormComponent {
  @Output() submitLoginForm: EventEmitter<ILogin> = new EventEmitter();
  show:boolean=false;
  password(){
    this.show=!this.show;
  }
  private fb = inject(FormBuilder);
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  get loginFormControl() {
    return this.loginForm.controls;
  }

  onSumbit() {
    if (this.loginForm.valid) {
      this.submitLoginForm.emit(this.loginForm.value as ILogin);
    }
  }
}
