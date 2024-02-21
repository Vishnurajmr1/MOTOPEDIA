import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'followers-list',
  templateUrl: './followers-list.component.html',
  styleUrls: ['./followers-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FollowersListComponent {

}
