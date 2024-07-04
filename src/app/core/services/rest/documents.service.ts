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

  postUtterances(payload: any) {
    const path = `utterances`;
    const uriPeticion = `${this.url}/${path}`;
    return this.http.post<any>(uriPeticion, payload);
  }

  putUtterancesById(id: number, payload: any) {
    const path = `utterances/${id}`;
    const uriPeticion = `${this.url}/${path}`;
    return this.http.put<any>(uriPeticion, payload);
  }

  getResponsesById(id: number) {
    const path = `responses/${id}`;
    const uriPeticion = `${this.url}/${path}`;
    return this.http.get<any>(uriPeticion);
  }

  postResponses(payload: any) {
    const path = `responses`;
    const uriPeticion = `${this.url}/${path}`;
    return this.http.post<any>(uriPeticion, payload);
  }

  putResponsesById(id: number, payload: any) {
    const path = `responses/${id}`;
    const uriPeticion = `${this.url}/${path}`;
    return this.http.put<any>(uriPeticion, payload);
  }

  getSyncronize() {
    const path = `update-chatbot`;
    const uriPeticion = `${this.url}/${path}`;
    return this.http.get<any>(uriPeticion);
  }
}
