import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{
  path:'',
  loadChildren:()=>
  import('../profile-container/profile-container.module').then((m)=>m.ProfileContainerModule)
},
{
  path: ':id',
  loadChildren:()=>
  import('../profile-container/profile-container.module').then((m)=>m.ProfileContainerModule)
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileShellRoutingModule { }
