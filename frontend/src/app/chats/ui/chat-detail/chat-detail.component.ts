import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ChatMessageInterface } from 'src/app/shared/types/chat.Interface';
import { IUserDetails } from 'src/app/shared/types/user.Interface';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatDetailComponent {
  @Input() messageRecieved!: boolean;
  @Input() participantData:IUserDetails|undefined;
  @Input()
  CurrentChatMessages: ChatMessageInterface[]=[];
  @Output() messageSend: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  isSendByUser!: Function;
  messageTyped: string = '';
  chatHistory: any;
  isCurrentUserSender(msg: any): boolean {
    return this.isSendByUser(msg);
  }
  sendMessage(): void {
    if (this.messageTyped.trim()) {
      this.messageSend.emit(this.messageTyped);
      this.messageTyped = '';
    }
  }
}
