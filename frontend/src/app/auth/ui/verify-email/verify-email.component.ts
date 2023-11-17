import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyEmailComponent {
  @Output() submitVerifyEmailForm: EventEmitter<{ email: string }> =
    new EventEmitter();
  private fb = inject(FormBuilder);

  verifyForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });
  onSubmit() {
    if (this.verifyForm.valid) {
      window.localStorage.setItem(
        'verify-otp_timestamp',
        new Date().getTime().toString()
      );
      this.submitVerifyEmailForm.emit(
        this.verifyForm.value as { email: string }
      );
    }
  }
}
