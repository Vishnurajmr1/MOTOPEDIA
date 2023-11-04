import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/ui/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'',
    pathMatch:'full'
  },
  {
    path:'auth',
    loadChildren:()=>
    import('./auth/feature/auth-shell/auth-shell.module').then(m=>m.AuthShellModule)
  },
  {
    path: '**',
    component:NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
