import { Component,EventEmitter,Input,Output,inject,ChangeDetectionStrategy } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms'
import { ILogin } from 'src/app/shared/interfaces/Interface';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  @Output() submitLoginForm:EventEmitter<ILogin>=new EventEmitter();

  private fb=inject(FormBuilder);
  loginForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]]
  })

  onSumbit(){
    if(this.loginForm.valid){
      this.submitLoginForm.emit(this.loginForm.value as ILogin)
    }
  }
}
