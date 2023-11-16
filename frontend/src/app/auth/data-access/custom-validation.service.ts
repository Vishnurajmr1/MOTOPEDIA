import { Injectable } from '@angular/core';

import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomValidationService {
  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return {};
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? {} : { invalidPassword: true };
    };
  }

  MatchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];
      if (!passwordControl || !confirmPasswordControl) {
        return {};
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors?.['passwordMismatch']
      ) {
        return {};
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
      return {};
    };
  }
}
