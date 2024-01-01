import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideComponent {
  @Output() editprofile = new EventEmitter<void>();
  @Output() postsClicked = new EventEmitter<void>();
  @Output() savedPostsClicked = new EventEmitter<void>();

  onEditProfile() {
    this.editprofile.emit();
  }
  onPosts() {
    this.postsClicked.emit();
  }
  onSavedPosts() {
    this.savedPostsClicked.emit();
  }
}
