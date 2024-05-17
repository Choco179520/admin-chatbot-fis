import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MsalService } from "@azure/msal-angular";
import { AuthenticationResult } from "@azure/msal-common";
import { catchError, lastValueFrom, map, switchMap, throwError } from "rxjs";

@Component({
  selector: "app-formulario-inicio-sesion",
  templateUrl: "./formulario-inicio-sesion.component.html",
  styleUrls: ["./formulario-inicio-sesion.component.scss"],
})
export class FormularioInicioSesionComponent implements OnInit {
  constructor(
    private readonly _msalService: MsalService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {}

  inicioOffice() {
    console.log("inicio de sesion......");

    // this._router
    // .navigateByUrl('/menu', { skipLocationChange: true })
    // .then(() => {
    // this._router.navigate(['./menu-principal']).then();
    // });
    this._msalService.instance
      .handleRedirectPromise()
      .then((res) => {
        console.log(res, "respuesta......");

        try {
          console.log("metidi JC");

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
        console.log(res, "loginPopup response....");

        const consultaDatos = {
          nombre: res.account.name,
          correo: res.account.username,
        };
        console.log(res, "esto es res");

        const tokenString = JSON.stringify(res.accessToken);
      })
      .catch((err) => {});
  }

  protected handleError(error: any) {
    // console.log('UsuarioService');
    if ("error" in error) {
      // Alert.General({
      //   icon: 'error',
      //   title: 'Ups algo paso!',
      //   text: error.error?.message ?? '',
      //   isJustify: false,
      //   showCancelButton: false,
      // });
    }
    if ("errorCode" in error) {
      switch (error.errorCode) {
        case "interaction_in_progress":
          // Alert.General({
          //   icon: 'error',
          //   title: 'Ups algo paso!',
          //   text: 'Cierre el navegador e intente de nuevo',
          //   isJustify: false,
          //   showCancelButton: false,
          // });
          break;
        default:
          console.warn(error.errorCode);
          break;
      }
    }
    const err = new Error("Ups algo paso!");
    return throwError(() => err);
  }
}
