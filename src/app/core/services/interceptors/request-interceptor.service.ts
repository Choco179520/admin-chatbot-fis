import {inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EncriptadoService} from "../encriptacion/encriptacion-aes.service";
import {CookiesService} from "../cookies/cookies.service";
import {ModalGeneralService} from "../loadings/modal-general.service";
import {COOKIE_JWT_TOKEN} from "../../constants/nombres-cookies.constantes";
import { JwtHelperService } from "@auth0/angular-jwt";
import {Router} from "@angular/router";
const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor {

  private _router = inject(Router)

  constructor(
    private readonly _encriptadoService: EncriptadoService,
    private readonly _cookiesService: CookiesService,
    private readonly _modalGeneralService: ModalGeneralService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>>| any {
    request = this.setearToken(request);
    request = this.cifrarInfromacionEnvio(request);
    return next.handle(request);
  }

  setearToken(request: any): any {
    const accessTokenString = this._cookiesService.obtenerCookie(COOKIE_JWT_TOKEN);
    if (accessTokenString) {
      const accessToken = JSON.parse(this._encriptadoService.desencriptarInformacionCookie(accessTokenString));
      const isExpired = helper.isTokenExpired(accessToken);
      if (isExpired) {
        this._cookiesService.eliminarTodasCookies();
        this._router.navigate(['/']).then();
      }
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      return request;
    } else {
      return request;
    }

  }

  cifrarInfromacionEnvio(request: HttpRequest<any>): any {
    if (request.method === 'POST' || request.method === 'PUT') {
      const datosEncriptados = this._encriptadoService.encriptarInformacionRequest(JSON.stringify(request.body));
      request = request.clone({
        body: {
          d: datosEncriptados,
        },
      });
      return request;
    }
    return request;
  }
}
