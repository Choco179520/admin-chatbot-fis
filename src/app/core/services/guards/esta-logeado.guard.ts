import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {CookiesService} from "../cookies/cookies.service";
import {EncriptadoService} from "../encriptacion/encriptacion-aes.service";
import {ModalGeneralService} from "../loadings/modal-general.service";
import {COOKIE_JWT_TOKEN} from "../../constants/nombres-cookies.constantes";

const helper = new JwtHelperService();

@Injectable({providedIn: 'root'})
export class EstaLogeadoGuard implements CanActivate {
  constructor(
    private readonly _cookiesService: CookiesService,
    private readonly _router: Router,
    private readonly _encriptadoService: EncriptadoService,
    private readonly _modalGeneralService: ModalGeneralService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const accessTokenString = this._cookiesService.obtenerCookie(COOKIE_JWT_TOKEN);
    if (accessTokenString) {
      const accessToken = JSON.parse(this._encriptadoService.desencriptarInformacionCookie(accessTokenString));
      const isExpired = helper.isTokenExpired(accessToken);
      if (!isExpired) {
        return true;
      } else {
        this._cookiesService.eliminarCookieCierreFlujo();
        return false;
      }
    } else {
      this._router.navigate(['/']).then();
      return false;
    }
  }
}
