import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ModalGeneralService } from "src/app/core/services/loadings/modal-general.service";

@Component({
  selector: "app-tarjeta-ultimo-nivel",
  templateUrl: "./tarjeta-ultimo-nivel.component.html",
  styleUrls: ["./tarjeta-ultimo-nivel.component.scss"],
})
export class TarjetaUltimoNivelComponent {
  @Input() register!: any;
  @Input() indice!: any;
  @Output() opcionSelected = new EventEmitter<{
    register: any;
    opcion: string;
    indice: number
  }>();

  constructor(
    private readonly _modalGeneralService: ModalGeneralService
  ) {}

  selectOpcion(option: string) {    
    if (!this.register.eliminar || option == 'delete') {
      this.opcionSelected.emit({ register: this.register, opcion: option, indice: this.indice });
    } else {
      this._modalGeneralService.toasterMensaje('info', 'Para poder acceder debes quitar la opción de eliminación.')
    }
  }
}
