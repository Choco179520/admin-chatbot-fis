import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgregarEditarUsuarioComponent } from '../../../administracion-usuarios/modals/agregar-editar-usuario/agregar-editar-usuario.component';

@Component({
  selector: 'app-agregar-editar-expresiones',
  templateUrl: './agregar-editar-expresiones.component.html',
  styleUrls: ['./agregar-editar-expresiones.component.scss']
})
export class AgregarEditarExpresionesComponent implements OnInit{
  formExpression!: FormGroup | any;

  constructor(
    public dialogRef: MatDialogRef<AgregarEditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formInicializar();
  }

  formInicializar() {
    this.formExpression = this._formBuilder.group({
      utterance: new FormControl(
        this.data ?? "",
        Validators.compose([Validators.required])
      ),
    });
  }

  acept() {    
    if (this.formExpression.valid) {
      this.dialogRef.close(this.formExpression.value);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
