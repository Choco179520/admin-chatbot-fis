import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {CookiesService} from "../cookies/cookies.service";
import {COOKIE_JWT_TOKEN} from "../../constants/nombres-cookies.constantes";


@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _cookiesService = inject(CookiesService);

  private mensajeSpinner = new BehaviorSubject<string> ('Estamos validando tu información');
  mensajeSpinner$ = this.mensajeSpinner.asObservable();

  /** Obtener datos del usuario quien ingreso */
  private AdUser = new BehaviorSubject<any | undefined>(undefined);
  AdUser$ = this.AdUser.asObservable();

  private mensajeHeader = new Subject<string | undefined> ();
  mensajeHeader$ = this.mensajeHeader.asObservable();

  constructor() {
    const userCurrent = this._cookiesService.obtenerCookie(COOKIE_JWT_TOKEN);
    if (userCurrent) {
      this.setAdUser(userCurrent!);
    }
  }

  setMensaje(mensaje: string) {
    this.mensajeSpinner.next(mensaje);
  }

  setAdUser(data: any | undefined) {
    this.AdUser.next(data);
  }

  setMensajeHeader(data: string) {
    this.mensajeHeader.next(data);
  }
}
