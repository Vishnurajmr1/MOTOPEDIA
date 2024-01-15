import { NgModule } from '@angular/core';
import { ChatsRoutingModule } from './chat-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    ChatsRoutingModule
  ]
})
export class ChatShellModule { }
