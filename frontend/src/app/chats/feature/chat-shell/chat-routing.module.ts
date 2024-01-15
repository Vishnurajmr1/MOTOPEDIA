import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatContainerComponent } from '../chat-container/chat-container.component';

const routes: Routes = [
  {
    path:'',
    loadChildren:()=>
    import('../chat-container/chat-container.module').then(m=>m.ChatContainerModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatsRoutingModule { }
