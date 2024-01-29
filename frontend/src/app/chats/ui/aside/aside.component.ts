import { ChangeDetectionStrategy, Component, EventEmitter, Output,Input } from '@angular/core';
import { ICurrentUser } from 'src/app/auth/data-access/state/auth.reducer';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent {
@Output() chatSelected:EventEmitter<ICurrentUser>=new EventEmitter<ICurrentUser>
  @Input() followers!:[ICurrentUser];

  onChatClick(follow: ICurrentUser | undefined):void{
    this.chatSelected.emit(follow)
  }
}
