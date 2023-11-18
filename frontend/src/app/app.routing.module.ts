import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/ui/not-found/not-found.component';
import { unauthenticatedGuard } from './shared/guard/unauthenticated.guard';
const routes: Routes = [
  {
    path:'',
    redirectTo:'auth',
    pathMatch:'full'
  },
  {
    path:'auth',
    loadChildren:()=>
    import('./auth/feature/auth-shell/auth-shell.module').then(m=>m.AuthShellModule),
    canActivate:[unauthenticatedGuard]
  },
  {
    path:'home',
    loadChildren:()=>import('./home/feature/home.module').then(m=>m.HomeModule)
  },
  {
    path:'not-found',
    component:NotFoundComponent
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
