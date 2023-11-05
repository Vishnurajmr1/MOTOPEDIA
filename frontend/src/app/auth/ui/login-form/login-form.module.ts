import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginFormComponent],
  imports: [CommonModule,ReactiveFormsModule],
  exports: [LoginFormComponent],
})
export class LoginFormModule {}
