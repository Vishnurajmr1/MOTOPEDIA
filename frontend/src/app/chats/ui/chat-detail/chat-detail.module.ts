import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatDetailComponent } from './chat-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HideScrollbarDirective } from 'src/app/shared/directives/hideScrollbar.directive';
import { TimeAgoModule } from 'src/app/shared/pipes/time-ago.module';



@NgModule({
  declarations: [
    ChatDetailComponent,
    HideScrollbarDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    TimeAgoModule
    
  ],
  exports:[
    ChatDetailComponent
  ]
})
export class ChatDetailModule { }
