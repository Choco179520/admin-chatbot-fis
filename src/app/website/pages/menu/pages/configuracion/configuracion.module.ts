import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { GestionNivelUnoComponent } from './components/gestion-nivel-uno/gestion-nivel-uno.component';
import { GestionNivelDosComponent } from './components/gestion-nivel-dos/gestion-nivel-dos.component';
import { GestionNivelTresComponent } from './components/gestion-nivel-tres/gestion-nivel-tres.component';
import { GestionExpresionesComponent } from './components/gestion-expresiones/gestion-expresiones.component';
import { GestionRespuestasComponent } from './components/gestion-respuestas/gestion-respuestas.component';
import { AgregarEditarNivelesComponent } from './modals/agregar-editar-niveles/agregar-editar-niveles.component';


@NgModule({
  declarations: [
    GestionNivelUnoComponent,
    GestionNivelDosComponent,
    GestionNivelTresComponent,
    GestionExpresionesComponent,
    GestionRespuestasComponent,
    AgregarEditarNivelesComponent
  ],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule
  ]
})
export class ConfiguracionModule { }
