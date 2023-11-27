import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'posts',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    loadChildren: () =>
      import('../post-list/post-list.module').then((m) => m.PostListModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class postShellRoutingModule {}
