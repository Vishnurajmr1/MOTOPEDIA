import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/ui/not-found/not-found.component';
import { unauthenticatedGuard } from './core/guard/unauthenticated.guard';
import { adminAuthGuard } from './core/guard/admin-auth.guard';
import { authGuard } from './core/guard/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/feature/auth-shell/auth-shell.module').then(
        (m) => m.AuthShellModule
      ),
    canActivate: [unauthenticatedGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/feature/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('./posts/feature/post-shell/post-shell.module').then(
        (m) => m.PostShellModule
      ),
      canActivate:[authGuard]
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/feature/admin-shell/admin-shell.module').then(
        (m) => m.adminShellModule
      ),
    canActivate: [adminAuthGuard],
    data: { layout: 'admin' },
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
