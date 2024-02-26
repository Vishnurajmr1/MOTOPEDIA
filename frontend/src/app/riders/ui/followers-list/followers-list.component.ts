import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICurrentUser } from 'src/app/auth/data-access/state/auth.reducer';
import { Tab } from 'src/app/shared/types';
import { IUserInfo } from 'src/app/shared/types/user.Interface';

@Component({
  selector: 'followers-list',
  templateUrl: './followers-list.component.html',
  styleUrls: ['./followers-list.component.css'],
})
export class FollowersListComponent {
  @Input() followersList!: [IUserInfo];
  @Input() followingList!: [IUserInfo];
  @Input()modalOpen!:boolean;
  protected TabType:typeof Tab=Tab;
  selectedTab:string=this.TabType.Followers;

  toggleTab(tab:string):void{
    this.selectedTab=tab;
  }
  closeModal() {
    this.modalOpen = false;
  }
}
