import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { EncriptadoService } from "../services/encriptacion/encriptacion-aes.service";
import { CookiesService } from "../services/cookies/cookies.service";
import {
  COOKIE_AZURE_TOKEN,
  COOKIE_AZURE_USER,
} from "../constants/nombres-cookies.constantes";
const helper = new JwtHelperService();

const jwt = new JwtHelperService();
@Injectable({
  providedIn: "root",
})
export class AutorizacionGuard implements CanActivate {
  constructor(
    private readonly _cookiesService: CookiesService,
    private readonly _router: Router,
    private readonly _encriptadoService: EncriptadoService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let logIn: boolean | any =
      this._cookiesService.obtenerCookie(COOKIE_AZURE_TOKEN) &&
      this._cookiesService.obtenerCookie(COOKIE_AZURE_USER);

    const accessTokenString =
      this._cookiesService.obtenerCookie(COOKIE_AZURE_TOKEN);

    if (accessTokenString && accessTokenString.length > 0) {
      const accessToken = JSON.parse(
        this._encriptadoService.desencriptarInformacionCookie(accessTokenString)
      );
      const isExpired = helper.isTokenExpired(accessToken);
      if (isExpired) logIn = false;
    }
    if (!logIn) this._router.navigate(["/login"]);

    return logIn;
  }
}
