import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICurrentUser } from 'src/app/auth/data-access/state/auth.reducer';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent {
  @Input() followers!:[ICurrentUser];
}
