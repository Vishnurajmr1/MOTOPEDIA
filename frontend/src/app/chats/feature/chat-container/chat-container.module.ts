import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatContainerRoutingModule } from './chat-container-routing.module';
import { ChatContainerComponent } from './chat-container.component';


@NgModule({
  declarations: [
    ChatContainerComponent
  ],
  imports: [
    CommonModule,
    ChatContainerRoutingModule
  ]
})
export class ChatContainerModule { }
