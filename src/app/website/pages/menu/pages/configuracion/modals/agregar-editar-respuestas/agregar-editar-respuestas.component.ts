import { Component, Inject, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AgregarEditarUsuarioComponent } from "../../../administracion-usuarios/modals/agregar-editar-usuario/agregar-editar-usuario.component";

@Component({
  selector: "app-agregar-editar-respuestas",
  templateUrl: "./agregar-editar-respuestas.component.html",
  styleUrls: ["./agregar-editar-respuestas.component.scss"],
})
export class AgregarEditarRespuestasComponent implements OnInit {
  formResponse!: FormGroup | any;

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
    this.formResponse = this._formBuilder.group({
      type: new FormControl(
        this.data?.data?.email ?? "",
        Validators.compose([Validators.required])
      ),
      content: new FormControl(
        this.data?.data?.nombre ?? "",
        Validators.compose([Validators.minLength(10)])
      ),
      path: new FormControl(
        this.data?.data?.telefono ?? "",
        Validators.compose([Validators.minLength(10)])
      ),
      name: new FormControl(
        this.data?.data?.rol ?? "",
        Validators.compose([Validators.minLength(10)])
      ),
      alt: new FormControl(
        this.data?.data?.rol ?? "",
        Validators.compose([Validators.minLength(10)])
      ),
    });
  }

  acept() {
    if (this.formResponse.valid) {
      this.dialogRef.close(this.formResponse.value);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
