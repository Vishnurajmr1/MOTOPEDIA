import { ChangeDetectionStrategy, Component, EventEmitter, Output,Input } from '@angular/core';
import { ICurrentUser } from 'src/app/auth/data-access/state/auth.reducer';
import { IUserInfo } from 'src/app/shared/types/user.Interface';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent {
@Output() chatSelected:EventEmitter<IUserInfo>=new EventEmitter<IUserInfo>
  @Input() followers!:[IUserInfo];

  onChatClick(follow: IUserInfo | undefined):void{
    this.chatSelected.emit(follow)
  }
}
