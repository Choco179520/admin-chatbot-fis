import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "tituloPipe",
})
export class TituloPipe implements PipeTransform {
  transform(value: string): string {
    let titulo = value.toUpperCase();
    titulo = titulo.replace(/_/g, ' ');
    titulo = titulo.replace(/-/g, ' ');
    return titulo;
  }
}
