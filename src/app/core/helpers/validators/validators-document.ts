import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export default class Validation {
  static validEpnEmail() {
    return (control: AbstractControl): ValidationErrors | null => {
      const email = control.value;
      if (email && email.indexOf("@") !== -1) {
        const [_, emailDomain] = email.split("@");
        if (emailDomain !== "epn.edu.ec") {
          return { emailDomain: true };
        }
      }
      return null;
    };
  }

  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl) => {
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }
}
