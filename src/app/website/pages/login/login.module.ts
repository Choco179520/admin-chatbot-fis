import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { FormularioInicioSesionComponent } from './components/formulario-inicio-sesion/formulario-inicio-sesion.component';


@NgModule({
  declarations: [
    FormularioInicioSesionComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
