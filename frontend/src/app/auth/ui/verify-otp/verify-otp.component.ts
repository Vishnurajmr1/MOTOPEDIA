import {
  Component,
  Output,
  ChangeDetectionStrategy,
  EventEmitter,
  ViewChild,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyOtpComponent {
  constructor() {
    this.timer();
  }
  @Output() submitVerifyOtpForm: EventEmitter<{ otp: string }> =
    new EventEmitter();
  @Output() resendOtp: EventEmitter<void> = new EventEmitter();
  display:any;
  submitted: boolean = false;
  otp: string = '';

  inputs: number[] = [0, 0, 0, 0, 0, 0];
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  onSubmit() {
    this.submitted = true;
    const isOtpValid = this.otpInputs
      .toArray()
      .every((input) => /^\d$/.test(input.nativeElement.value));
    if (isOtpValid) {
      this.otp = this.otpInputs
        .map((input) => input.nativeElement.value)
        .join('');
      this.submitted = false;

      this.submitVerifyOtpForm.emit({ otp: this.otp });
    } else {
      this.submitted = true;
      console.error('Oops enter valid otp');
    }
  }
  onInput(index: number) {
    if (index < this.otpInputs.length - 1) {
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    }
  }
  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && index > 0) {
      event.preventDefault();
      this.inputs[index] = 0;
      this.otpInputs.toArray()[index].nativeElement.value = '';
      this.otpInputs.toArray()[index-1].nativeElement.focus();
    }
  }

  timer(minute = 1) {
    let seconds: number = minute * 60;
    let textSec: number|string = '0';
    let startSec: number = seconds;
    const prefix = minute < 10 ? '0' : '';

    const timer = setInterval(() => {
      seconds--;
      if (startSec != 0) startSec--;
      else startSec = 59;

      if (startSec < 10) {
        textSec = '0' + startSec;
      } else textSec = startSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
      if (seconds <= 0) {
        clearInterval(timer);
        this.display = '';
      }
    },1000);
  }
  resend() {
    this.timer();
    this.resendOtp.emit();
  }
}
