import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateChatComponent } from './create-chat.component';
import { ModalModule } from 'src/app/shared/ui/modal/modal.module';



@NgModule({
  declarations: [
    CreateChatComponent
  ],
  imports: [
    CommonModule,
    ModalModule
  ],
  exports:[
    CreateChatComponent
  ]
})
export class CreateChatModule { }
