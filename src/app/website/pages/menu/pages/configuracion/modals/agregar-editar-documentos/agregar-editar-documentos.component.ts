import { Component, Inject, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-agregar-editar-documentos",
  templateUrl: "./agregar-editar-documentos.component.html",
  styleUrls: ["./agregar-editar-documentos.component.scss"],
})
export class AgregarEditarDocumentosComponent implements OnInit {
  formDocument!: FormGroup | any;

  constructor(
    public dialogRef: MatDialogRef<AgregarEditarDocumentosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formInicializar();
  }

  formInicializar() {
    this.formDocument = this._formBuilder.group({
      title: new FormControl(
        this.data?.title ?? '',
        Validators.compose([Validators.required])
      ),
      expression: new FormControl(
        { value: '', disabled: this.data ? true : false },
        Validators.compose([Validators.required])
      ),
      type: new FormControl(
        { value: 'text', disabled: this.data ? true : false },
        Validators.compose([Validators.required])
      ),
      content: new FormControl(
        { value: '', disabled: this.data ? true : false },
        Validators.compose([Validators.minLength(2)])
      ),
      action: new FormControl(
        { value: '', disabled: this.data ? true : false },
        Validators.compose([Validators.minLength(2)])
      ),
      path: new FormControl(
        { value: '', disabled: this.data ? true : false },
        Validators.compose([Validators.minLength(2)])
      ),
      name: new FormControl(
        { value: '', disabled: this.data ? true : false },
        Validators.compose([Validators.minLength(2)])
      ),
      alt: new FormControl(
        { value: '', disabled: this.data ? true : false },
        Validators.compose([Validators.minLength(2)])
      ),
    });
  }

  get campoType(): AbstractControl {
    return this.formDocument.get('type') as FormControl;
  }

  acept() {
    if (this.formDocument.valid) {
      this.dialogRef.close(this.formDocument.value);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
