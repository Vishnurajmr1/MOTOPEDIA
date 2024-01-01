import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ModalService } from '../../data-access/global/modal.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @Input() modalOpen: boolean = false;
  @Output() close = new EventEmitter<null>();

  toggleModal() {
    this.modalOpen = !this.modalOpen;
    if (!this.modalOpen) {
      this.close.emit();
    }
  }
}
