import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IpostInterface } from 'src/app/shared/types/post.Interface';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPostComponent {
  @Input() posts!: IpostInterface[];
  showButton: boolean = false;
  @Output() toggleModal = new EventEmitter<{
    post: IpostInterface;
    actionType: string;
  }>();
  ngOnInit(): void {
    console.log(this.posts);
  }
  showEditButton() {
    this.showButton = true;
  }
  handleEditModal(data: { post: IpostInterface; actionType: string }) {
    this.toggleModal.emit(data)
  }
}
