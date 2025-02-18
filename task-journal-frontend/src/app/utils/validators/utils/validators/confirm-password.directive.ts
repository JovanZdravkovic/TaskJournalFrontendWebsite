import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appConfirmPassword]',
  providers: [{provide: NG_VALIDATORS, useExisting: ConfirmPasswordDirective, multi: true}]
})
export class ConfirmPasswordDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordDisparity: true };
  }
}
