import { COLOR_SECUNDARIO } from "./../../../../../../../core/constants/colores-constantes";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { COLUMNA_USUARIOS } from "src/app/core/constants/columnas-constantes";
import { UsuarioService } from "src/app/core/services/rest/usuario.service";
import { AgregarEditarUsuarioComponent } from "../../modals/agregar-editar-usuario/agregar-editar-usuario.component";
import {
  TAMANIO_MODAL,
  TAMANIO_MODAL_MOVIL,
} from "src/app/core/constants/valores.constantes";
import { EstadoUsuarioEnum } from "src/app/core/enums/estados";
import { ModalGeneralService } from "src/app/core/services/loadings/modal-general.service";
import { ModalInterface } from "src/app/core/interfaces/modal.interface";
import { COLOR_PRIMARIO } from "src/app/core/constants/colores-constantes";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  AbstractControl,
} from "@angular/forms";
import { CookiesService } from "src/app/core/services/cookies/cookies.service";
import { COOKIE_USER } from "src/app/core/constants/nombres-cookies.constantes";
import { EncriptadoService } from "src/app/core/services/encriptacion/encriptacion-aes.service";

@Component({
  selector: "app-gestion-usuarios",
  templateUrl: "./gestion-usuarios.component.html",
  styleUrls: ["./gestion-usuarios.component.scss"],
})
export class GestionUsuariosComponent implements OnInit {
  formularioBusqueda!: FormGroup | any;
  user!: any;
  registros: any = [];
  usuarios: any = [];
  totalRecords!: number;
  loading = false;
  columnas = COLUMNA_USUARIOS;

  estados = EstadoUsuarioEnum;

  constructor(
    private readonly _usuarioService: UsuarioService,
    private readonly _dialog: MatDialog,
    private readonly _modalGeneralService: ModalGeneralService,
    private readonly _formBuilder: FormBuilder,
    private readonly _cookiesService: CookiesService,
    private readonly _encriptadoService: EncriptadoService
  ) {
    const userEncript = this._cookiesService.obtenerCookie(COOKIE_USER);
    this.user = JSON.parse(
      this._encriptadoService.desencriptarInformacionCookie(userEncript)
    );
  }

  ngOnInit(): void {
    this.getUsers();

    this.formInicializar();
    this.escucharCampoBusqueda();
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
      this.registros = this.usuarios.filter(
        (entidad: any) =>
          entidad.nombre.toLowerCase().includes(bus.toLowerCase()) ||
          entidad.email.toLowerCase().includes(bus.toLowerCase())
      );
    });
  }

  get campoBusqueda(): AbstractControl {
    return this.formularioBusqueda.get("search") as FormControl;
  }

  getUsers() {
    this._usuarioService.getUsers().subscribe({
      next: (respUsers) => {
        this.usuarios = respUsers;
        this.registros = this.usuarios;
      },
      error: (err) => {},
    });
  }

  newUser() {
    let widthModal = TAMANIO_MODAL;
    if (window.outerWidth < 500) {
      widthModal = TAMANIO_MODAL_MOVIL;
    }

    const dialogRef = this._dialog.open(AgregarEditarUsuarioComponent, {
      width: widthModal,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const jsonUser = {
          nombre: result.names,
          email: result.email,
          rol: result.rol,
          password: result.password,
        };
        this._usuarioService.postUsuario(jsonUser).subscribe({
          next: (respUser: any) => {
            this.usuarios.unshift(respUser);
            this.registros = this.usuarios;
            this._modalGeneralService.toasterMensaje(
              "success",
              "Se agrego exitosamente el usuario"
            );
          },
          error: (err) => {
            console.error(err, "error...");
            this._modalGeneralService.mensajeModalError(
              "No se puede registrar"
            );
          },
        });
      }
    });
  }

  changeState(rowData: any, ri: number) {
    if (rowData.estado == EstadoUsuarioEnum.PENDIENTE_ACTIVACION) {
      this._modalGeneralService.toasterMensaje(
        "error",
        "No se puede editar el estado de un usuario que no ha restablecido su contraseña"
      );
    } else {
      this.loading = true;
      const estadoEditar = {
        estado: obtenerEstado(rowData.estado),
      };

      this._usuarioService.putUsuario(estadoEditar, rowData.id).subscribe({
        next: (resp) => {
          this.loading = false;
          this.usuarios[ri].estado = resp.estado;
          this.registros = this.usuarios;
          this._modalGeneralService.toasterMensaje(
            "success",
            "Se ha actualizado exitosamente el estado"
          );
        },
        error: (err) => {
          this.loading = false;
          this._modalGeneralService.toasterMensaje(
            "error",
            "No se pudo actualizar."
          );
        },
      });
    }
  }

  editUser(rowData: any, ri: number) {
    let widthModal = TAMANIO_MODAL;
    if (window.outerWidth < 500) {
      widthModal = TAMANIO_MODAL_MOVIL;
    }

    const dialogRef = this._dialog.open(AgregarEditarUsuarioComponent, {
      width: widthModal,
      data: { data: rowData },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loading = true;
        const jsonUser = {
          nombre: result.names,
          email: result.email,
          rol: result.rol,
        };
        this._usuarioService.putUsuario(jsonUser, rowData.id).subscribe({
          next: (respUser: any) => {
            this.loading = false;
            this.usuarios[ri].rol = respUser.rol;
            this.registros = this.usuarios;
          },
          error: (err) => {
            console.error(err, "error...");
            this.loading = false;
            this._modalGeneralService.mensajeModalError(
              "No se puede editar la información del usuario"
            );
          },
        });
      }
    });
  }

  async deleteUser(rowData: any, ri: number) {
    const jsonModal: ModalInterface = {
      icono: "question",
      colorIcono: COLOR_PRIMARIO,
      nombreBotonAceptar: "Si",
      colorBotonAceptar: COLOR_PRIMARIO,
      nombreBotonCancelar: "No",
      colorBotonCancelar: COLOR_SECUNDARIO,
      mostrarBotonCancelar: true,
      mensaje: "Estás seguro que deseas eliminar el usuario?",
    };
    const respModal = await this._modalGeneralService.mensajeModalGeneral(
      jsonModal
    );
    if (respModal) {
      this.loading = true;
      this._usuarioService.deleteUser(rowData.id).subscribe({
        next: (respDelete) => {
          this.usuarios.splice(ri, 1);
          this.registros = this.usuarios;
          this.loading = false;

          this._modalGeneralService.toasterMensaje(
            "success",
            "Se eliminó exitosamente el usuario"
          );
        },
        error: (err) => {
          console.error(err, "err respDelete....");
          this.loading = false;
        },
      });
    }
  }
}

function obtenerEstado(estado: any) {
  const estados: any = {
    INAC: EstadoUsuarioEnum.ACTIVO,
    ACT: EstadoUsuarioEnum.INACTIVO,
    BLOQ_LOG: EstadoUsuarioEnum.ACTIVO,
  };
  return estados[estado];
}
