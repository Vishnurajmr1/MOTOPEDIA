import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  Input,
  SimpleChanges,
} from '@angular/core';
import {
  ChatListItemInterface,
  ChatMessageInterface,
} from 'src/app/shared/types/chat.Interface';
import { IUserDetails } from 'src/app/shared/types/user.Interface';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent {
  @Output() chatSelected: EventEmitter<{
    participant: IUserDetails;
    chatId: string;
  }> = new EventEmitter<{ participant: IUserDetails; chatId: string }>();
  @Input() allChats: ChatListItemInterface[] = [];
  lastMessage: ChatMessageInterface | undefined;
  protected participants!: IUserDetails[];
  lastMessageUpdatedTime!: string;
  onChatClick(participant: IUserDetails, chatId: string): void {
    console.log(participant, chatId);
    this.chatSelected.emit({ participant, chatId });
  }

  ngOnChanges(): void {
    console.log(this.allChats);
  }
}
