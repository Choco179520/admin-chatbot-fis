import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable, catchError, map, of, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  segmento = "usuario";
  url = `${environment.host}/${environment.pathApi}/${this.segmento}`;

  constructor(private readonly http: HttpClient) {}

  getUsers() {
    const path = "find-all";
    const uriPeticion = `${this.url}/${path}`;    
    return this.http.get<any>(uriPeticion);
  }

  postUsuario(data: any) {
    const path = "create";
    const uriPeticion = `${this.url}/${path}`;
    return this.http.post<any>(uriPeticion, data);
  }

  putUsuario(data: any, id: number) {
    const path = "update";
    const uriPeticion = `${this.url}/${path}/${id}`;    
    return this.http.put<any>(uriPeticion, data);
  }

  deleteUser(id: number) {
    const path = "delete";
    const uriPeticion = `${this.url}/${path}/${id}`;    
    return this.http.delete<any>(uriPeticion);
  }

  getCuentas(data: any) {
    const path = "listar-cuentas-clientes";
    const uriPeticion = `${this.url}/${path}`;
    return this.http.post<any>(uriPeticion, data);
  }
}
