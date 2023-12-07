import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-create-post-button',
  templateUrl: './create-post-button.component.html',
  styleUrls: ['./create-post-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePostButtonComponent {
  @Output() createPostClicked: EventEmitter<void> = new EventEmitter<void>();
  onClick(): void {
    this.createPostClicked.emit();
  }
}
