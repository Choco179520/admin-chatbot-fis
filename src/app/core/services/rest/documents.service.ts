import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable, catchError, map, of, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DocumentService {
  segmento = "chatbot";
  url = `${environment.host}/${environment.pathApi}/${this.segmento}`;

  constructor(private readonly http: HttpClient) {}

  getDocuments() {
    const path = `documents`;
    const uriPeticion = `${this.url}/${path}`;
    return this.http.get<any>(uriPeticion);
  }

  postDocuments(payload: any) {
    const path = `documents`;
    const uriPeticion = `${this.url}/${path}`;
    return this.http.post<any>(uriPeticion, payload);
  }

  putDocuments(id: number, payload: any) {
    const path = `documents/${id}`;
    const uriPeticion = `${this.url}/${path}`;
    return this.http.put<any>(uriPeticion, payload);
  }

  getUtterancesById(id: number) {
    const path = `utterances/${id}`;
    const uriPeticion = `${this.url}/${path}`;
    return this.http.get<any>(uriPeticion);
  }

  getResponsesById(id: number) {
    const path = `responses/${id}`;
    const uriPeticion = `${this.url}/${path}`;
    return this.http.get<any>(uriPeticion);
  }
}
