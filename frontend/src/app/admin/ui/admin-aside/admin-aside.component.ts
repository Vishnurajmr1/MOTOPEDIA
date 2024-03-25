import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
@Component({
  selector: 'app-admin-aside',
  templateUrl: './admin-aside.component.html',
  styleUrls: ['./admin-aside.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminAsideComponent {
  @Input() OpenSideBar!: boolean;
  AdminLinks:string[]=['dashboard','users','posts','subscriptions']
  constructor() {}
  ngOnDestroy(): void {
  }
}
