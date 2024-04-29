import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-tarjeta-niveles",
  templateUrl: "./tarjeta-niveles.component.html",
  styleUrls: ["./tarjeta-niveles.component.scss"],
})
export class TarjetaNivelesComponent {
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
