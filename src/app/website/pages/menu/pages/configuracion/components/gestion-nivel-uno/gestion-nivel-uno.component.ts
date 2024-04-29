import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  AbstractControl,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { MenuItem } from "primeng/api";
import { ModalGeneralService } from "src/app/core/services/loadings/modal-general.service";

@Component({
  selector: "app-gestion-nivel-uno",
  templateUrl: "./gestion-nivel-uno.component.html",
  styleUrls: ["./gestion-nivel-uno.component.scss"],
})
export class GestionNivelUnoComponent implements OnInit {
  formularioBusqueda!: FormGroup | any;

  items!: MenuItem[];

  registros: any = [];
  documentos: any = [];
  totalRecords!: number;
  loading = false;

  pathSiguiente!: string;

  constructor(
    // private readonly _usuarioService: UsuarioService,
    private readonly _dialog: MatDialog,
    private readonly _modalGeneralService: ModalGeneralService,
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activatedRoute.data.subscribe((data: any) => {
      this.pathSiguiente = data.path;
      this.items = data.breadcrumb;
    });

    this.formInicializar();
    this.escucharCampoBusqueda();

    this.registros = [
      {
        id: "default_answers",
        count: 2,
      },
      {
        id: "enrollment",
        count: 4,
      },
      {
        id: "extra",
        count: 1,
      },
      {
        id: "payments",
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
      this.registros = this.documentos.filter(
        (entidad: any) =>
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
    let path = `${this.pathSiguiente}/${register.id}/gestion-nivel-2`;
    this._router.navigate([path]).then();
  }
}
