import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/shared/data-access/global/utlis.service';

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
  constructor(private utlis:UtilsService){}

  form!: FormGroup;

  private fb = inject(FormBuilder);
  ngOnInit() {
    this.form = this.fb.group({
      title: [this.initalText, [Validators.required,UtilsService.noWhiteSpaceValidator()]],
    });
  }

  onSubmit(): void {
    this.handleSubmit.emit(this.form.value.title);
    this.form.reset();
  }
}
