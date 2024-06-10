import { Component } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  AbstractControl,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router, ActivatedRoute } from "@angular/router";
import { COLUMNA_EXPRESIONES } from "src/app/core/constants/columnas-constantes";
import { ModalGeneralService } from "src/app/core/services/loadings/modal-general.service";
import { AgregarEditarExpresionesComponent } from "../../modals/agregar-editar-expresiones/agregar-editar-expresiones.component";
import {
  TAMANIO_MODAL,
  TAMANIO_MODAL_MOVIL,
} from "src/app/core/constants/valores.constantes";
import { MenuItem } from "primeng/api";
import { DocumentService } from "src/app/core/services/rest/documents.service";
import { ModalInterface } from "src/app/core/interfaces/modal.interface";

@Component({
  selector: "app-gestion-expresiones",
  templateUrl: "./gestion-expresiones.component.html",
  styleUrls: ["./gestion-expresiones.component.scss"],
})
export class GestionExpresionesComponent {
  formularioBusqueda!: FormGroup | any;

  items!: MenuItem[];

  itemsBall = [
    { color: "#D9D9D9", text: "Registro sin modificación" },
    { color: "#6ad3fd", text: "Registro modificado" },
    { color: "#ff432c", text: "Registro eliminado" },
  ];

  registros: any = [];
  documentos: any = [];
  totalRecords!: number;
  loading = false;

  pathSiguiente!: string;

  titulo!: string;
  id!: number;

  columnas = COLUMNA_EXPRESIONES;

  constructor(
    // private readonly _usuarioService: UsuarioService,
    private readonly _dialog: MatDialog,
    private readonly _modalGeneralService: ModalGeneralService,
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _documentService: DocumentService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params: any) => {
      console.log(params, "params...");
      this.titulo = params.title;
      this.id = params.id;
    });

    this._activatedRoute.data.subscribe((data: any) => {
      this.items = data.breadcrumb;
      this.pathSiguiente = data.path;
    });

    this.formInicializar();
    this.escucharCampoBusqueda();
    this.getUtterances();
  }

  formInicializar() {
    this.registros = this.registros;
    this.formularioBusqueda = this._formBuilder.group({
      search: new FormControl(""),
    });
  }

  escucharCampoBusqueda(): void {
    const busquedaC = this.campoBusqueda;
    busquedaC.valueChanges.subscribe((bus) => {
      this.registros = this.documentos.filter((entidad: any) =>
        entidad.utterance.toLowerCase().includes(bus.toLowerCase())
      );
    });
  }

  get campoBusqueda(): AbstractControl {
    return this.formularioBusqueda.get("search") as FormControl;
  }

  newExpression() {
    let widthModal = TAMANIO_MODAL;
    if (window.outerWidth < 500) {
      widthModal = TAMANIO_MODAL_MOVIL;
    }

    const dialogRef = this._dialog.open(AgregarEditarExpresionesComponent, {
      width: widthModal,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result, "result.....");
      }
    });
  }

  async deleteUtterance(rowData: any, ri: number) {
    console.log(rowData, "rowdata...");

    const infoModal: ModalInterface = {
      titulo: "¿Estás seguro que deseas eliminar la expresión?",
      icono: "question",
    };
    const modal = await this._modalGeneralService.mensajeModalConsulta(
      infoModal
    );
    if (modal) {
      const jsonUpdate = {
        eliminar: Number(!rowData.eliminar),
        document: rowData.document.id,
      };
      console.log(jsonUpdate, "delete");

      this._documentService
        .putUtterancesById(rowData.id, jsonUpdate)
        .subscribe({
          next: (resp) => {
            console.log(resp, "respuesta update");
            this.registros[ri].eliminar = resp.eliminar;
            this.documentos = this.registros;
          },
          error: (err) => {
            console.error(err);
          },
        });
    }
  }

  editUtterance(rowData: any, ri: number) {
    console.log(rowData, "rowData....");

    let widthModal = TAMANIO_MODAL;
    if (window.outerWidth < 500) {
      widthModal = TAMANIO_MODAL_MOVIL;
    }

    const dialogRef = this._dialog.open(AgregarEditarExpresionesComponent, {
      width: widthModal,
      disableClose: true,
      data: rowData.utterance,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const json = {
          ...result,
          estado: 0,
          eliminar: rowData.eliminar,
          document: rowData.document.id,
        };

        this._documentService.putUtterancesById(rowData.id, json).subscribe({
          next: (resp) => {
            this.registros[ri].utterance = resp.utterance;
            this.registros[ri].estado = resp.estado;
            this.documentos = this.registros;
            this.loading = false;
            this._modalGeneralService.toasterMensaje(
              "success",
              "Se actualizo exitosamente"
            );
          },
          error: (err) => {
            console.error(err, "error update");
            this._modalGeneralService.toasterMensaje(
              "error",
              "Error al actualizar la información, intentelo nuevamente"
            );
            this.loading = false;
          },
        });
      }
    });
  }

  onItemClick(event: { originalEvent: Event; item: MenuItem | any }) {
    let path = event.item.link;
    if (event.item.tabindex == 1) {
      path = `${path}/${this.titulo}/gestion-nivel-2`;
    }
    if (event.item.tabindex == 2) {
      // path = `${path}/${this.titulo}/gestion-nivel-2/${this.subtitulo}/gestion-nivel-3`;
    }
    this._router.navigate([path]).then();
  }

  getUtterances() {
    this.loading = true;
    this._documentService.getUtterancesById(this.id).subscribe({
      next: (resp) => {
        this.registros = resp;
        console.log(this.registros);
        this.documentos = this.registros;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }
}
