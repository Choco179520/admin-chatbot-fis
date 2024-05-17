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

@Component({
  selector: "app-gestion-documentos",
  templateUrl: "./gestion-documentos.component.html",
  styleUrls: ["./gestion-documentos.component.scss"],
})
export class GestionDocumentosComponent {
  formularioBusqueda!: FormGroup | any;

  items!: MenuItem[];

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

  opcionSelected(event: { register: any; opcion: string }) {
    let { register, opcion } = event;
    switch (opcion) {
      case "utterences":
        this.navigatedUtterences(register);
        break;
      case "responses":
        this.navigatedResponses(register);
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

  navigatedUtterences(register: any) {
    let path = `${this.pathSiguiente}/${this.titulo}/gestion-nivel-2/${this.subtitulo}/gestion-nivel-3/${register.id}/expresiones`;
    this._router.navigate([path]).then();
  }

  navigatedResponses(register: any) {
    let path = `${this.pathSiguiente}/${this.titulo}/gestion-nivel-2/${this.subtitulo}/gestion-nivel-3/${register.id}/respuestas`;
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
    this._documentService.getDocuments()
    .subscribe({
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
        console.log(this.registros);
        this.documentos = this.registros;
      },
      error: (err) => {},
    })
  }
}
