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
  @ViewChild('remoteVideo') remoteVideoRef!: ElementRef;
  @ViewChild('myVideo') myVideoRef!: ElementRef;
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
  onMakeVideCall(chatId: string): void {
    this.makeVideoCallClicked.emit(chatId);
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log(this.remoteVideoRef);
  }
  get remoteVideoElement(): ElementRef {
    console.log(this.remoteVideoRef);
    return this.remoteVideoRef;
  }
  get myVideoElement(): ElementRef {
    return this.myVideoRef;
  }
}
