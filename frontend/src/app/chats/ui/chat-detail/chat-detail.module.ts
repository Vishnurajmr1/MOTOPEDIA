import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatDetailComponent } from './chat-detail.component';



@NgModule({
  declarations: [
    ChatDetailComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ChatDetailComponent
  ]
})
export class ChatDetailModule { }
