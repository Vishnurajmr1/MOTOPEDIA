import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentFormComponent {
  @Input() submitLabel!: string;
  @Input() hasCancelButton: boolean = false;
  @Input() initalText: string = '';
  @Output() handleSubmit = new EventEmitter<string>();

  form!: FormGroup;

  private fb = inject(FormBuilder);
  ngOnInit() {
    this.form = this.fb.group({
      title: [this.initalText, Validators.required],
    });
  }

  onSubmit(): void {
    this.handleSubmit.emit(this.form.value.title);
    this.form.reset();
  }
}
