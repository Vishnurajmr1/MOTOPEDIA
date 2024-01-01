import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserDoc } from '../../../shared/types/user.Interface';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProfileComponent {
  @Input() userData:UserDoc|undefined;
closeModal() {
  this.openModal=false;
}
  openModal=true
}
