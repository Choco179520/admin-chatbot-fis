import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-tarjeta-ultimo-nivel",
  templateUrl: "./tarjeta-ultimo-nivel.component.html",
  styleUrls: ["./tarjeta-ultimo-nivel.component.scss"],
})
export class TarjetaUltimoNivelComponent {
  @Input() register!: any;
  @Output() opcionSelected = new EventEmitter<{
    register: any;
    opcion: string;
  }>();

  constructor() {}

  selectOpcion(option: string) {
    this.opcionSelected.emit({ register: this.register, opcion: option });
  }
}
