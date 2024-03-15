import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  Input,
  SimpleChanges,
} from '@angular/core';
import { ChatListItemInterface } from 'src/app/shared/types/chat.Interface';
import { IUserDetails } from 'src/app/shared/types/user.Interface';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent {
  @Output() chatSelected: EventEmitter<IUserDetails> =
    new EventEmitter<IUserDetails>();
  @Input() userChats!: ChatListItemInterface[];
  protected participants!: IUserDetails[];
  onChatClick(follow: IUserDetails | undefined): void {
    this.chatSelected.emit(follow);
  }

  ngOnChanges(): void {
    this.extractParticipants();
  }
  private extractParticipants() {
    this.participants = [];
    if (this.userChats) {
      this.userChats.forEach((chat) => {
        this.participants.push(...(chat.participants || []));
      });
    }
  }
}
