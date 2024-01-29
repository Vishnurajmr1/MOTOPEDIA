import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatDetailComponent } from './chat-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ChatDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports:[
    ChatDetailComponent
  ]
})
export class ChatDetailModule { }
