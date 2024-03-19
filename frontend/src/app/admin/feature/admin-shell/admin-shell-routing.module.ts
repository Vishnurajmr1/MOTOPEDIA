import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('../users-container/users-container.module').then(
        (m) => m.UsersContainerModule
      ),
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('../post-container/post-container.module').then(
        (m) => m.PostContainerModule
      ),
  },
  {
    path: 'reportPosts',
    loadChildren: () =>
      import('../report-post-container/report-post-container.module').then(
        (m) => m.ReportPostContainerModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class adminShellRoutingModule {}
