import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAccessComponent } from './auth-access.component';
import { LoginFormComponent } from '../../ui/login-form/login-form.component';
import { SignupFormComponent } from '../../ui/signup-form/signup-form.component';
import { VerifyEmailComponent } from '../../ui/verify-email/verify-email.component';

const routes:Routes=[
    {
        path:'',
        component:AuthAccessComponent,
        children:[
            {path:'login',component:LoginFormComponent},
            {path:'signup',component:SignupFormComponent}
        ]
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class AuthAccessRoutingModule{}