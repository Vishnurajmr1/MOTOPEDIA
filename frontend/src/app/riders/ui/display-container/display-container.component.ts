import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-display-container',
  templateUrl: './display-container.component.html',
  styleUrls: ['./display-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayContainerComponent {

}
