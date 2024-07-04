import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { FormularioInicioSesionComponent } from './components/formulario-inicio-sesion/formulario-inicio-sesion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CambiarContraseniaComponent } from './modals/cambiar-contrasenia/cambiar-contrasenia.component';


@NgModule({
  declarations: [
    FormularioInicioSesionComponent,
    CambiarContraseniaComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
