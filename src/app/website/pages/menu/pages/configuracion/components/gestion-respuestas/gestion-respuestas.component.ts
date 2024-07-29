import { Component } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  AbstractControl,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router, ActivatedRoute } from "@angular/router";
import { COLUMNA_RESPUESTAS } from "src/app/core/constants/columnas-constantes";
import {
  TAMANIO_MODAL,
  TAMANIO_MODAL_MOVIL,
} from "src/app/core/constants/valores.constantes";
import { ModalGeneralService } from "src/app/core/services/loadings/modal-general.service";
import { AgregarEditarRespuestasComponent } from "../../modals/agregar-editar-respuestas/agregar-editar-respuestas.component";
import { MenuItem } from "primeng/api";
import { DocumentService } from "src/app/core/services/rest/documents.service";
import { ModalInterface } from "src/app/core/interfaces/modal.interface";
import { removeEmptyValues } from "src/app/core/functions/funciones-generales";

@Component({
  selector: "app-gestion-respuestas",
  templateUrl: "./gestion-respuestas.component.html",
  styleUrls: ["./gestion-respuestas.component.scss"],
})
export class GestionRespuestasComponent {
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

  columnas = COLUMNA_RESPUESTAS;

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
      this.titulo = params.title;
      this.id = params.id;
    });

    this._activatedRoute.data.subscribe((data: any) => {
      this.items = data.breadcrumb;
      this.pathSiguiente = data.path;
    });

    this.formInicializar();
    this.escucharCampoBusqueda();

    this.getResponses();
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
      this.registros = this.documentos.filter((entidad: any) => {
        const nameExists =
          entidad?.response?.name &&
          typeof entidad?.response?.name === "string";
        const contentExists =
          entidad?.response?.content &&
          typeof entidad?.response?.content === "string";
        const nameMatches =
          nameExists &&
          entidad?.response.name.toLowerCase().includes(bus.toLowerCase());
        const contentMatches =
          contentExists &&
          entidad?.response?.content.toLowerCase().includes(bus.toLowerCase());
        return nameMatches || contentMatches;
      });
    });
  }

  get campoBusqueda(): AbstractControl {
    return this.formularioBusqueda.get("search") as FormControl;
  }

  newResponse() {
    let widthModal = TAMANIO_MODAL;
    if (window.outerWidth < 500) {
      widthModal = TAMANIO_MODAL_MOVIL;
    }

    const dialogRef = this._dialog.open(AgregarEditarRespuestasComponent, {
      width: widthModal,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result = removeEmptyValues(result);
        const json = {
          response: JSON.stringify(result),
          document: +this.id,
          estado: 0,
          eliminar: 0,
        };
        this._documentService.postResponses(json).subscribe({
          next: (resp) => {
            this.registros.unshift({
              document: this.registros[0].document,
              id: resp.id,
              eliminar: resp.eliminar,
              estado: resp.estado,
              response: JSON.parse(resp.response),
            });
            this.documentos = this.registros;
            this.loading = false;
            this._modalGeneralService.toasterMensaje(
              "success",
              "Se registro exitosamente"
            );
          },
          error: (err) => {
            console.error(err, "error update");
            this._modalGeneralService.toasterMensaje(
              "error",
              "Error al registrar la información, intentelo nuevamente"
            );
            this.loading = false;
          },
        });
      }
    });
  }

  async deleteResponse(rowData: any, ri: number) {
    const infoModal: ModalInterface = {
      titulo: "¿Estás seguro que deseas eliminar la respuesta?",
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

      this._documentService.putResponsesById(rowData.id, jsonUpdate).subscribe({
        next: (resp) => {
          this.registros[ri].eliminar = resp.eliminar;
          this.documentos = this.registros;
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  editResponse(rowData: any, ri: number) {
    let widthModal = TAMANIO_MODAL;
    if (window.outerWidth < 500) {
      widthModal = TAMANIO_MODAL_MOVIL;
    }

    const dialogRef = this._dialog.open(AgregarEditarRespuestasComponent, {
      width: widthModal,
      disableClose: true,
      data: { ...rowData.response },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let image;
        result = removeEmptyValues(result);
        if (result.image) {
          image = result.image;
          delete result.image;
        }
        const json = {
          response: JSON.stringify({ ...result }),
          estado: 0,
          eliminar: rowData.eliminar,
          document: rowData.document.id,
          image
        };

        this._documentService.putResponsesById(rowData.id, json).subscribe({
          next: (resp) => {
            this.registros[ri].response = JSON.parse(resp.response);
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
      // path = `${path}/${this.titulo}/gestion-nivel-2/${this.subtitulo}/gestion-nivel-3`
    }
    this._router.navigate([path]).then();
  }

  getResponses() {
    this.loading = true;
    this._documentService.getResponsesById(this.id).subscribe({
      next: (resp) => {
        console.log(resp, 'respuesta...');
        
        this.registros = resp;
        this.documentos = this.registros;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }
}
