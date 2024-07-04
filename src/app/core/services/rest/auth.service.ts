import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable, catchError, map, of, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  protected segmento = "auth";
  protected url = `${environment.host}/${environment.pathApi}/${this.segmento}`;

  constructor(private readonly http: HttpClient) {}

  iniciarSesion(body: any) {
    const path = "inicio-sesion";
    const uriPeticion = `${this.url}/${path}`;
    return this.http.post<any>(uriPeticion, body);
  }

  cambiarContrasenia(body: any) {
    const path = "cambiar-contrasenia";
    const uriPeticion = `${this.url}/${path}`;
    return this.http.post<any>(uriPeticion, body);
  }
}
