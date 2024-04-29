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
import { ESTADOS } from "src/app/core/enums/estados";
import { ModalGeneralService } from "src/app/core/services/loadings/modal-general.service";
import { ModalInterface } from "src/app/core/interfaces/modal.interface";
import { COLOR_PRIMARIO } from "src/app/core/constants/colores-constantes";

@Component({
  selector: "app-gestion-usuarios",
  templateUrl: "./gestion-usuarios.component.html",
  styleUrls: ["./gestion-usuarios.component.scss"],
})
export class GestionUsuariosComponent implements OnInit {
  registros: any = [];
  usuarios: any = [];
  totalRecords!: number;
  loading = false;
  columnas = COLUMNA_USUARIOS;

  estados = ESTADOS;

  constructor(
    private readonly _usuarioService: UsuarioService,
    private readonly _dialog: MatDialog,
    private readonly _modalGeneralService: ModalGeneralService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this._usuarioService.getUsers().subscribe({
      next: (respUsers) => {
        console.log(respUsers, ";respuesta findall...");

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
          telefono: result.phone,
          rol: result.rol,
        };
        this._usuarioService.postUsuario(jsonUser).subscribe({
          next: (respUser: any) => {
            this.usuarios.unshift(respUser);
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
    this.loading = true;
    const estadoEditar = {
      estado: +!rowData.estado,
    };

    this._usuarioService.putUsuario(estadoEditar, rowData.id).subscribe({
      next: (resp) => {
        this.loading = false;
        this.usuarios[ri].estado = resp.estado;
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
          telefono: result.phone,
          rol: result.rol,
        };
        this._usuarioService.putUsuario(jsonUser, rowData.id).subscribe({
          next: (respUser: any) => {
            this.loading = false;
            this.usuarios[ri].nombre = respUser.nombre;
            this.usuarios[ri].email = respUser.email;
            this.usuarios[ri].rol = respUser.rol;
            this.usuarios[ri].telefono = respUser.telefono;
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
          console.log(respDelete, "respDelete....");
          this.usuarios.splice(ri, 1);
          this.loading = false;
        },
        error: (err) => {
          console.log(err, "err respDelete....");
          this.loading = false;
        },
      });
    }
  }
}
