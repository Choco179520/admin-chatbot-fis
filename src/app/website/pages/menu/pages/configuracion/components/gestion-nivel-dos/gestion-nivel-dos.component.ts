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

@Component({
  selector: "app-gestion-nivel-dos",
  templateUrl: "./gestion-nivel-dos.component.html",
  styleUrls: ["./gestion-nivel-dos.component.scss"],
})
export class GestionNivelDosComponent {
  formularioBusqueda!: FormGroup | any;

  items!: MenuItem[];

  registros: any = [];
  documentos: any = [];
  totalRecords!: number;
  loading = false;

  pathSiguiente!: string;

  titulo!: string;

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
    });

    this._activatedRoute.data.subscribe((data: any) => {
      this.pathSiguiente = data.path;
      this.items = data.breadcrumb;
    });

    this.formInicializar();
    this.escucharCampoBusqueda();

    this.registros = [
      {
        id: "enrollment_types",
        count: 1,
      },
      {
        id: "extraordinary_enrollment",
        count: 1,
      },
      {
        id: "regular_enrollment",
        count: 1,
      },
      {
        id: "special_enrollment",
        count: 1,
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
        entidad.id.toLowerCase().includes(bus.toLowerCase())
      );
    });
  }

  get campoBusqueda(): AbstractControl {
    return this.formularioBusqueda.get("search") as FormControl;
  }

  opcionSelected(event: { register: any; opcion: string }) {
    let { register, opcion } = event;
    switch (opcion) {
      case "select":
        this.navigatetDocument(register);
        break;
      case "edit":
        this.editDocument(register);
        break;
      default:
        this.deleteDocument(register);
        break;
    }
  }

  newDocument() {}

  editDocument(register: any) {}

  deleteDocument(register: any) {}

  navigatetDocument(register: any) {
    let path = `${this.pathSiguiente}/${this.titulo}/gestion-nivel-2/${register.id}/gestion-nivel-3`;
    this._router.navigate([path]).then();
  }

  onItemClick(event: { originalEvent: Event, item: MenuItem | any }) {    
    let path = event.item.link;
    this._router.navigate([path]).then();
  }
}
