import { Injectable } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: "root",
})
export class CargandoService {
  constructor(private spinner: NgxSpinnerService) {}

  /** Cargando simple */
  habilitarCargando() {
    this.spinner
      .show(undefined, {
        size: "large",
        bdColor: "rgba(6,62,87,1)",
        color: "white",
        fullScreen: true,
        showSpinner: true,
      })
      .then();
  }

  /** Deshabilitar Cargando simple */
  deshabilitarCargando() {
    this.spinner.hide().then();
  }
}
