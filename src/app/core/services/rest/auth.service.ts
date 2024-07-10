import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable, catchError, map, of, switchMap, tap } from "rxjs";
import { CookiesService } from "../cookies/cookies.service";
import { EncriptadoService } from "../encriptacion/encriptacion-aes.service";
import { COOKIE_JWT_TOKEN, ROLES } from "../../constants/nombres-cookies.constantes";
import { JwtHelperService } from "@auth0/angular-jwt";
const helper = new JwtHelperService();

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public user!: any;

  protected segmento = "auth";
  protected url = `${environment.host}/${environment.pathApi}/${this.segmento}`;

  constructor(
    private readonly http: HttpClient,
    private readonly _coookiesService: CookiesService,
    private readonly _encriptadoService: EncriptadoService
  ) {}

  setRoles(roles: string) {
    this._coookiesService.almacenarCookie(
      ROLES,
      this._encriptadoService.encriptarInformacionCookie(roles)
    );
  }

  hasRole(role: string): boolean {
    const rolesString = this._coookiesService.obtenerCookie(ROLES);    
    const roles = this._encriptadoService.desencriptarInformacionCookie(rolesString);
    return roles.includes(role);
  }

  getRole(): string {
    const rolesString = this._coookiesService.obtenerCookie(ROLES);    
    return this._encriptadoService.desencriptarInformacionCookie(rolesString);
  }

  iniciarSesion(data: any) {
    const path = "inicio-sesion";
    const uriPeticion = `${this.url}/${path}`;
    return this.http.post<any>(uriPeticion, data).pipe(
      switchMap((res: any) => {
        // rol
        this.setRoles(res.usuarioConsulta.rol);
        this.user = res.usuarioConsulta;
        return of({ ...res });
      }),
      catchError((err: any) => {
        return of(err);
      })
    );
  }

  cambiarContrasenia(body: any) {
    const path = "cambiar-contrasenia";
    const uriPeticion = `${this.url}/${path}`;
    return this.http.post<any>(uriPeticion, body);
  }
}
