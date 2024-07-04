import { Component, Inject } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import Validation from "src/app/core/helpers/validators/validators-document";
import { ModalGeneralService } from "src/app/core/services/loadings/modal-general.service";
import { AuthService } from "src/app/core/services/rest/auth.service";

@Component({
  selector: "app-cambiar-contrasenia",
  templateUrl: "./cambiar-contrasenia.component.html",
  styleUrls: ["./cambiar-contrasenia.component.scss"],
})
export class CambiarContraseniaComponent {
  formPassword!: FormGroup | any;
  passwordGenerado!: string;

  constructor(
    public dialogRef: MatDialogRef<CambiarContraseniaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly _formBuilder: FormBuilder,
    private readonly _authService: AuthService,
    private readonly _modalGeneralService: ModalGeneralService
  ) {
    console.log(this.data, 'data....');
    
  }

  ngOnInit(): void {
    console.log(this.data, "data......");
    this.formInicializar();
  }

  formInicializar() {
    this.formPassword = this._formBuilder.group(
      {
        password: new FormControl(
          "",
          Validators.compose([Validators.required])
        ),
        newPassword: new FormControl(
          "",
          Validators.compose([
            Validators.minLength(8),
            Validators.maxLength(20),
            Validators.required,
            Validation.patternValidator(/[0-9]/, { hasNumber: true }),
            Validation.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
            Validation.patternValidator(/[!@#$%&*]/, {
              hasSpecialCharacters: true,
            }),
          ])
        ),
        confirmPassword: new FormControl("", [Validators.required]),
      },
      {
        validator: this.validarQueSeanIguales,
      }
    );
  }

  get campoPassword(): AbstractControl {
    return this.formPassword.get("password") as FormControl;
  }

  get campoNewPassword(): AbstractControl {
    return this.formPassword.get("newPassword") as FormControl;
  }

  validarQueSeanIguales: any = (
    control: FormGroup
  ): ValidationErrors | null => {
    const contrasenia = control.get("newPassword");
    const confirmarContrasenia = control.get("confirmPassword");

    return contrasenia?.value === confirmarContrasenia?.value
      ? null
      : { noSonIguales: true };
  };

  acept() {
    console.log(this.formPassword, "value....");
    if (this.formPassword.valid) {
      this.formPassword.value.email = this.data.email;
      this._authService.cambiarContrasenia(this.formPassword.value).subscribe({
        next: (resp) => {
          console.log(resp);
          if (resp.status == "ok") {
            this._modalGeneralService.toasterMensaje("success", resp.message);
            this.dialogRef.close();
          }
        },
        error: (err) => {
          console.error(err, "errpr");
        },
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
