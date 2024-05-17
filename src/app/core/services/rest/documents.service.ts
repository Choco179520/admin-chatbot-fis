import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable, catchError, map, of, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DocumentService {
  segmento = "chatbot/documents";
  url = `${environment.host}/${environment.pathApi}/${this.segmento}`;

  constructor(private readonly http: HttpClient) {}

  getDocuments() {
    const uriPeticion = `${this.url}`;    
    return this.http.get<any>(uriPeticion);
  }
}
