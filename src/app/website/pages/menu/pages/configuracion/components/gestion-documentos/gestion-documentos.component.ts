import { Component } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  AbstractControl,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router, ActivatedRoute } from "@angular/router";
import { MenuItem } from "primeng/api";
import { ModalGeneralService } from "src/app/core/services/loadings/modal-general.service";
import { DocumentService } from "src/app/core/services/rest/documents.service";
import { AgregarEditarDocumentosComponent } from "../../modals/agregar-editar-documentos/agregar-editar-documentos.component";
import {
  TAMANIO_MODAL,
  TAMANIO_MODAL_MOVIL,
} from "src/app/core/constants/valores.constantes";
import { ModalInterface } from "src/app/core/interfaces/modal.interface";

@Component({
  selector: "app-gestion-documentos",
  templateUrl: "./gestion-documentos.component.html",
  styleUrls: ["./gestion-documentos.component.scss"],
})
export class GestionDocumentosComponent {
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
  subtitulo!: string;

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
      this.titulo = params.id;
      this.subtitulo = params.subId;
    });

    this._activatedRoute.data.subscribe((data: any) => {
      this.items = data.breadcrumb;
      this.pathSiguiente = data.path;
    });

    this.formInicializar();
    this.escucharCampoBusqueda();

    this.getDocuments();
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
        entidad.title.toLowerCase().includes(bus.toLowerCase())
      );
    });
  }

  get campoBusqueda(): AbstractControl {
    return this.formularioBusqueda.get("search") as FormControl;
  }

  opcionSelected(event: { register: any; opcion: string; indice: number }) {
    let { register, opcion, indice } = event;
    switch (opcion) {
      case "utterences":
        this.navigatedUtterences(register);
        break;
      case "responses":
        this.navigatedResponses(register);
        break;
      case "edit":
        this.editDocument(register, indice);
        break;
      default:
        this.deleteDocument(register, indice);
        break;
    }
  }

  newDocument() {
    let widthModal = TAMANIO_MODAL;
    if (window.outerWidth < 500) {
      widthModal = TAMANIO_MODAL_MOVIL;
    }

    const dialogRef = this._dialog.open(AgregarEditarDocumentosComponent, {
      width: widthModal,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const json = {
          ...result,
          estado: 0,
          eliminar: 0,
        };
        this._documentService.postDocuments(json).subscribe({
          next: (resp) => {
            resp.utterances = 1;
            resp.responses = 1;
            this.registros.unshift(resp);
            this.documentos = this.registros;
            this.loading = false;
            this._modalGeneralService.toasterMensaje(
              "success",
              "Se creó exitosamente el registro."
            );
          },
          error: (err) => {
            console.error(err, "error update");
            this._modalGeneralService.toasterMensaje(
              "error",
              "Error al crear el registro, intentelo nuevamente"
            );
            this.loading = false;
          },
        });
      }
    });
  }

  editDocument(register: any, indice: number) {
    let widthModal = TAMANIO_MODAL;
    if (window.outerWidth < 500) {
      widthModal = TAMANIO_MODAL_MOVIL;
    }

    const dialogRef = this._dialog.open(AgregarEditarDocumentosComponent, {
      width: widthModal,
      disableClose: true,
      data: register,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loading = true;
      if (result) {
        const json = {
          ...result,
          estado: 0,
          eliminar: register.eliminar,
        };

        this._documentService.putDocuments(register.id, json).subscribe({
          next: (resp) => {
            this.registros[indice].title = resp.title;
            this.registros[indice].estado = resp.estado;
            this.registros[indice].fechaActualizacion = resp.fechaActualizacion;
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

  async deleteDocument(register: any, indice: number) {
    const infoModal: ModalInterface = {
      titulo: "¿Estás seguro que deseas eliminar el documento?",
      icono: "question",
    };
    const modal = await this._modalGeneralService.mensajeModalConsulta(
      infoModal
    );
    if (modal) {
      const jsonUpdate = {
        eliminar: Number(!register.eliminar),
      };
      this._documentService.putDocuments(register.id, jsonUpdate).subscribe({
        next: (resp) => {
          this.registros[indice].eliminar = resp.eliminar;
          this.documentos = this.registros;
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  navigatedUtterences(register: any) {
    let path = `${this.pathSiguiente}/${register.id}/${register.title}/expresiones`;
    this._router.navigate([path]).then();
  }

  navigatedResponses(register: any) {
    let path = `${this.pathSiguiente}/${register.id}/${register.title}/respuestas`;
    this._router.navigate([path]).then();
  }

  onItemClick(event: { originalEvent: Event; item: MenuItem | any }) {
    let path = event.item.link;
    if (event.item.tabindex == 1) {
      path = `${path}/${this.titulo}/gestion-nivel-2`;
    }
    this._router.navigate([path]).then();
  }

  getDocuments() {
    this._documentService.getDocuments().subscribe({
      next: (resp) => {
        // this.registros = [
        //   {
        //     id: "matricula-ordinaria",
        //     responses: 3,
        //     utterances: 4,
        //   },
        //   {
        //     id: "requisitos-matricula-ordinaria",
        //     responses: 3,
        //     utterances: 4,
        //   },
        //   {
        //     id: "proceso-matricula-ordinaria",
        //     responses: 3,
        //     utterances: 4,
        //   },
        //   {
        //     id: "matricula-ordinaria",
        //     responses: 3,
        //     utterances: 4,
        //   },
        // ];

        this.registros = resp;
        this.documentos = this.registros;
      },
      error: (err) => {},
    });
  }

  sincronize() {
    this._documentService.getSyncronize().subscribe({
      next: (resp) => {
        console.log(resp, "respuesta....");
      },
      error: (err) => {},
    });
  }
}
