import { Component, Inject, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  AbstractControl,
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
    this.formInicializar();
  }

  formInicializar() {
    this.formResponse = this._formBuilder.group({
      type: new FormControl(
        this.data?.type ?? "text",
        Validators.compose([Validators.required])
      ),
      content: new FormControl(
        this.data?.content ?? "",
        Validators.compose([Validators.minLength(10)])
      ),
      action: new FormControl(
        this.data?.action ?? "",
        Validators.compose([Validators.minLength(1)])
      ),
      path: new FormControl(
        this.data?.path ?? "",
        Validators.compose([Validators.minLength(10)])
      ),
      name: new FormControl(
        this.data?.name ?? "",
        Validators.compose([Validators.minLength(10)])
      ),
      alt: new FormControl(
        this.data?.alt ?? "",
        Validators.compose([Validators.minLength(10)])
      ),
      image: new FormControl(""),
    });
  }

  get campoType(): AbstractControl {
    return this.formResponse.get("type") as FormControl;
  }

  acept() {
    if (this.formResponse.valid) {
      this.dialogRef.close(this.formResponse.value);
    }
  }

  async cargarImagen(event: any) {
    const documento = await this.convertirImagenBase64(event.target.files[0]);    
    let nombre = event.target.files[0].name;
    nombre = nombre.toLowerCase();
    nombre = nombre.replace(/ /g, '_');
    nombre = nombre.replace(/-/g, '_')
    this.formResponse.get("path").setValue(nombre);
    this.formResponse.get("image").setValue(documento);
  }

  async convertirImagenBase64(imagen: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(imagen);
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
