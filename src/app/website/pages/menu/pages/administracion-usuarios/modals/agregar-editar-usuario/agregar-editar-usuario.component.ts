import { Component, Inject, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-agregar-editar-usuario",
  templateUrl: "./agregar-editar-usuario.component.html",
  styleUrls: ["./agregar-editar-usuario.component.scss"],
})
export class AgregarEditarUsuarioComponent implements OnInit {
  formUser!: FormGroup | any;

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
        Validators.compose([Validators.email, Validators.required])
      ),
      names: new FormControl(
        this.data?.data?.nombre ?? "",
        Validators.compose([Validators.required])
      ),
      phone: new FormControl(
        this.data?.data?.telefono ?? "",
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ])
      ),
      rol: new FormControl(
        this.data?.data?.rol ?? "",
        Validators.compose([Validators.required])
      ),
    });
  }

  acept() {
    if (this.formUser.valid) {
      this.dialogRef.close(this.formUser.value);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  search() {}
}
