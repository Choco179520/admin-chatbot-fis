import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { MsalService } from "@azure/msal-angular";
import { AuthenticationResult } from "@azure/msal-common";
import { catchError, lastValueFrom, map, switchMap, throwError } from "rxjs";
import {
  TAMANIO_MODAL,
  TAMANIO_MODAL_MOVIL,
} from "src/app/core/constants/valores.constantes";
import Validation from "src/app/core/helpers/validators/validators-document";
import { AuthService } from "src/app/core/services/rest/auth.service";
import { CambiarContraseniaComponent } from "../../modals/cambiar-contrasenia/cambiar-contrasenia.component";
import { CookiesService } from "src/app/core/services/cookies/cookies.service";
import { COOKIE_JWT_TOKEN, COOKIE_USER } from "src/app/core/constants/nombres-cookies.constantes";
import { EncriptadoService } from "src/app/core/services/encriptacion/encriptacion-aes.service";
import { ModalGeneralService } from "src/app/core/services/loadings/modal-general.service";

@Component({
  selector: "app-formulario-inicio-sesion",
  templateUrl: "./formulario-inicio-sesion.component.html",
  styleUrls: ["./formulario-inicio-sesion.component.scss"],
})
export class FormularioInicioSesionComponent implements OnInit {
  formularioLogin!: FormGroup;
  pathImagen = `assets/icons/show.png`;
  passwordFieldType: string = "password";

  constructor(
    private readonly _msalService: MsalService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder,
    private readonly _authService: AuthService,
    private readonly _dialog: MatDialog,
    private readonly _coookiesService: CookiesService,
    private readonly _encriptadoService: EncriptadoService,
    private readonly _modalGeneralService: ModalGeneralService
  ) {}

  ngOnInit(): void {
    this.formInicializar();
  }

  formInicializar() {
    this.formularioLogin = this._formBuilder.group({
      email: new FormControl(
        "jonathan.parra01@epn.edu.ec",
        Validators.compose([
          Validators.email,
          Validators.required,
          Validation.validEpnEmail(),
        ])
      ),
      password: new FormControl(
        "chChoco20$",
        Validators.compose([
          Validators.minLength(5),
          Validators.maxLength(20),
          Validators.required,
        ])
      ),
    });
  }

  get campoEmail(): AbstractControl {
    return this.formularioLogin.get("email") as FormControl;
  }

  get campoPassword(): AbstractControl {
    return this.formularioLogin.get("password") as FormControl;
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === "password" ? "text" : "password";
    if (this.passwordFieldType == "text") {
      this.pathImagen = `assets/icons/hide.png`;
    } else {
      this.pathImagen = `assets/icons/show.png`;
    }
  }

  iniciarSesion() {
    this._authService.iniciarSesion(this.formularioLogin.value).subscribe({
      next: (resp) => {
        if (resp.accessToken) {
          this._coookiesService.almacenarCookie(
            COOKIE_JWT_TOKEN,
            this._encriptadoService.encriptarInformacionCookie(resp.accessToken)
          );
          this._coookiesService.almacenarCookie(
            COOKIE_USER,
            this._encriptadoService.encriptarInformacionCookie(JSON.stringify(resp.usuarioConsulta))
          );
          this._modalGeneralService.toasterMensaje(
            "success",
            "Inicio de sesión exitoso"
          );
          this._router
            .navigate(["./menu/administracion-usuarios/gestion-usuarios"])
            .then();
        }
      },
      error: (err) => {
        console.error(err, "respuesta error login");
        err.error.message = err.error.message.split(" :: ")[1];
        if (err.error.message == "La contraseña no ha sido restablecida") {
          let widthModal = TAMANIO_MODAL;
          if (window.outerWidth < 500) {
            widthModal = TAMANIO_MODAL_MOVIL;
          }

          const dialogRef = this._dialog.open(CambiarContraseniaComponent, {
            width: widthModal,
            data: { ...this.formularioLogin.value },
            disableClose: true,
          });

          dialogRef.afterClosed().subscribe((result) => {});
        } else {
          this._modalGeneralService.toasterMensaje("error", err.error.message);
        }
      },
    });
  }

  inicioOffice() {
    this._msalService.instance
      .handleRedirectPromise()
      .then((res) => {
        // console.log(res, "respuesta......");

        try {
          // console.log("metidi JC");

          this.metodoJc();
        } catch (err) {
          // this._cargandoService.deshabilitarCargando();
        }
      })
      .catch((err) => {
        // this._cargandoService.deshabilitarCargando();
      });
  }

  metodoJc() {
    lastValueFrom(this._msalService.loginPopup())
      .then((res: any) => {
        // console.log(res, "loginPopup response....");

        const consultaDatos = {
          nombre: res.account.name,
          correo: res.account.username,
        };
        // console.log(res, "esto es res");

        const tokenString = JSON.stringify(res.accessToken);
      })
      .catch((err) => {});
  }

  recuperarPassword() {}
}
