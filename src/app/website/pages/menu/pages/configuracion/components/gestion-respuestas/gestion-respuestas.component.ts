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

@Component({
  selector: "app-gestion-respuestas",
  templateUrl: "./gestion-respuestas.component.html",
  styleUrls: ["./gestion-respuestas.component.scss"],
})
export class GestionRespuestasComponent {
  formularioBusqueda!: FormGroup | any;

  items!: MenuItem[];

  itemsBall = [
    { color: '#D9D9D9', text: 'Registro sin modificación' },
    { color: '#6ad3fd', text: 'Registro modificado' },
    { color: '#ff432c', text: 'Registro eliminado' }
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
        console.log(result, "result.....");
      }
    });
  }

  async delete(rowData: any, ri: number) {
    const infoModal: ModalInterface = {
      titulo: '¿Estás seguro que deseas eliminar el documento?',
      icono: 'question',
    }
    const modal = await this._modalGeneralService.mensajeModalConsulta(infoModal);
    if (modal) {
      const jsonUpdate = {
        eliminar: Number(!rowData.eliminar),
      }      
      this._documentService.putResponsesById(rowData.id, jsonUpdate)
      .subscribe({
        next: (resp) => {
          console.log(resp, 'respuesta update'); 
          this.registros[ri].eliminar = resp.eliminar;
          this.documentos = this.registros;
        },
        error: (err) => {
          console.error(err);
          
        }
      })
    }
  }

  edit(rowData: any, ri: number) {
    console.log(rowData, "row..");

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
        console.log(result, "result.....");
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
