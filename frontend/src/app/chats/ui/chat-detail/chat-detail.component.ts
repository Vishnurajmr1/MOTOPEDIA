import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ChatMessageInterface, VideoCallEvent } from 'src/app/shared/types/chat.Interface';
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
  @Output() makeVideoCallClicked: EventEmitter<VideoCallEvent> =
    new EventEmitter<VideoCallEvent>();
  @Input()
  isSendByUser!: Function;
  // @ViewChild('remoteVideo') remoteVideoRef!: ElementRef;
  remoteVideoRef!: ElementRef;
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
    const remoteVideoRef = new ElementRef(
      document.getElementById('remoteVideo') as HTMLVideoElement
    );
    this.makeVideoCallClicked.emit({chatId,remoteVideoRef});
    // const event:VideoCallEvent={chatId,remoteVideoRef}
    
    console.log(this.remoteVideoRef);
  }
  get remoteVideoElement(): ElementRef<any> {
    console.log(this.remoteVideoRef);
    // return this.remoteVideoRef;
    return { nativeElement: this.remoteVideoRef };
  }
  get myVideoElement(): ElementRef {
    return this.myVideoRef;
  }
}
