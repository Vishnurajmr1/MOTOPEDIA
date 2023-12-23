import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsideComponent {

}
