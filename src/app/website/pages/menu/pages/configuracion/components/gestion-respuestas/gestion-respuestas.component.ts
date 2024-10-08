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

@Component({
  selector: "app-gestion-respuestas",
  templateUrl: "./gestion-respuestas.component.html",
  styleUrls: ["./gestion-respuestas.component.scss"],
})
export class GestionRespuestasComponent {
  formularioBusqueda!: FormGroup | any;

  items!: MenuItem[];

  registros: any = [];
  documentos: any = [];
  totalRecords!: number;
  loading = false;

  pathSiguiente!: string;

  titulo!: string;
  subtitulo!: string;
  nivel3!: string;

  columnas = COLUMNA_RESPUESTAS;

  constructor(
    // private readonly _usuarioService: UsuarioService,
    private readonly _dialog: MatDialog,
    private readonly _modalGeneralService: ModalGeneralService,
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params: any) => {
      this.titulo = params.id;
      this.subtitulo = params.subId;
      this.nivel3 = params.nivel3;
    });

    this._activatedRoute.data.subscribe((data: any) => {
      this.items = data.breadcrumb;
      this.pathSiguiente = data.path;
    });

    this.formInicializar();
    this.escucharCampoBusqueda();

    this.registros = [
      {
        response:
          "content: Si necesitas conocer más detalles sobre algún tipo de matrícula puedes hacerlo mediante los siguientes mensajes:",
        type: "text",
      },
      {
        response: "¿Cuál es el procedimiento de matrícula?",
        type: "action",
      },
      {
        response: "proceso-matricula-ordinaria",
        type: "action",
      },
      {
        response: "matricula-ordinaria",
        type: "action",
      },
    ];

    this.documentos = this.registros;
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
        entidad.response.toLowerCase().includes(bus.toLowerCase())
      );
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

  delete(rowData: any, ri: number) {}

  edit(rowData: any, ri: number) {}

  onItemClick(event: { originalEvent: Event; item: MenuItem | any }) {
    let path = event.item.link;
    if ((event.item.tabindex == 1)) {
      path = `${path}/${this.titulo}/gestion-nivel-2`;
    }
    if ((event.item.tabindex == 2)) {
      path = `${path}/${this.titulo}/gestion-nivel-2/${this.subtitulo}/gestion-nivel-3`
    }
    this._router.navigate([path]).then();
  }
}
