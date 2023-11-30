import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-post-button',
  templateUrl: './create-post-button.component.html',
  styleUrls: ['./create-post-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePostButtonComponent {
}
