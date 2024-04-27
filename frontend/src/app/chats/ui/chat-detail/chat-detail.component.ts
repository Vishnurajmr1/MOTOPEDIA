import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ChatMessageInterface, VideoCallEvent } from '../../../../app/shared/types/chat.Interface';
import { IUserDetails } from '../../../../app/shared/types/user.Interface';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.css'],
})
export class ChatDetailComponent {
  @Input() messageRecieved!: boolean;
  @Input() participantData: IUserDetails | undefined;
  @Input()
  CurrentChatMessages: ChatMessageInterface[] = [];
  @Output() messageSend: EventEmitter<string> = new EventEmitter<string>();
  @Output() makeVideoCallClicked: EventEmitter<string> =
    new EventEmitter<string>();
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
  onMakeVideoCall(chatId: string): void {
    this.makeVideoCallClicked.emit(chatId);
  }
}
