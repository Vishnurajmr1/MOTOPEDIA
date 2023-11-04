import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes:Routes=[
    {
      path:'',
      loadChildren:()=>
        import('../auth-access/auth-access.module').then(m => m.AuthAccessModule)
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class AuthShellRoutingModule{}