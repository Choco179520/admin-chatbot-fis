import { Component, Inject, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import Validation from "src/app/core/helpers/validators/validators-document";

@Component({
  selector: "app-agregar-editar-usuario",
  templateUrl: "./agregar-editar-usuario.component.html",
  styleUrls: ["./agregar-editar-usuario.component.scss"],
})
export class AgregarEditarUsuarioComponent implements OnInit {
  formUser!: FormGroup | any;
  passwordGenerado!: string;

  constructor(
    public dialogRef: MatDialogRef<AgregarEditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    console.log(this.data, "data......");
    this.formInicializar();
  }

  formInicializar() {
    this.formUser = this._formBuilder.group({
      email: new FormControl(
        this.data?.data?.email ?? "",
        Validators.compose([
          Validators.email,
          Validators.required,
          Validation.validEpnEmail(),
        ])
      ),
      names: new FormControl(
        this.data?.data?.nombre ?? "",
        Validators.compose([Validators.required])
      ),
      rol: new FormControl(
        this.data?.data?.rol ?? "",
        Validators.compose([Validators.required])
      ),
      password: new FormControl("", Validators.compose([Validators.required])),
    });
  }

  get campoEmail(): AbstractControl {
    return this.formUser.get("email") as FormControl;
  }

  acept() {
    if (this.formUser.valid) {
      console.log(this.formUser.value, 'value....');
      this.formUser.value.names = this.formUser.value.names.toUpperCase();
      this.dialogRef.close(this.formUser.value);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  search() {}

  generarPassword() {
    this.passwordGenerado = generarRandomico();
    this.formUser.get("password").setValue(this.passwordGenerado);
  }
}

function generarRandomico() {
  const digitos = "0123456789";
  let numero = "";
  for (let i = 0; i < 7; i++) {
    numero += digitos[Math.floor(Math.random() * 10)];
  }
  return `EPN${numero}`;
}
