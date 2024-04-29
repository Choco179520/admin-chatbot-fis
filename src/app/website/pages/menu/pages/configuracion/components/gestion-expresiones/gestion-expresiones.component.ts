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

@Component({
  selector: "app-gestion-expresiones",
  templateUrl: "./gestion-expresiones.component.html",
  styleUrls: ["./gestion-expresiones.component.scss"],
})
export class GestionExpresionesComponent {
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

  columnas = COLUMNA_EXPRESIONES;

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
        expression: "Procedimiento para una Matrícula Ordinaria",
        responses: 3,
        utterances: 4,
      },
      {
        expression: "¿Cuál es el procedimiento de matrícula?",
        responses: 3,
        utterances: 4,
      },
      {
        expression: "¿Cómo puedo matricularme?",
        responses: 3,
        utterances: 4,
      },
      {
        expression: "¿Qué pasos debo seguir para matricularme?",
        responses: 3,
        utterances: 4,
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
        entidad.expression.toLowerCase().includes(bus.toLowerCase())
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

  delete(rowData: any, ri: number) {}

  edit(rowData: any, ri: number) {}

  onItemClick(event: { originalEvent: Event, item: MenuItem | any }) {    
    let path = event.item.link;
    if (event.item.tabindex == 1) {
      path = `${path}/${this.titulo}/gestion-nivel-2`
    }    
    if (event.item.tabindex == 2) {
      path = `${path}/${this.titulo}/gestion-nivel-2/${this.subtitulo}/gestion-nivel-3`;
    }        
    this._router.navigate([path]).then();
  }
}
