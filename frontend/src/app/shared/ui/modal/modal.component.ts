import { Component } from '@angular/core';
import { ModalService } from '../../data-access/global/modal.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent<T> {
actionFunction() {
throw new Error('Method not implemented.');
}
closeModal() {
throw new Error('Method not implemented.');
}
  display = true;
modalData: any;
  constructor(private modalService: ModalService<T>) {}

  async close(): Promise<void> {
    this.display = false;

    setTimeout(async () => {
      await this.modalService.close();
    }, 300);
  }
}
