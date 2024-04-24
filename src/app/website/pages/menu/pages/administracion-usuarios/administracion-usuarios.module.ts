import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionUsuariosRoutingModule } from './administracion-usuarios-routing.module';
import { GestionUsuariosComponent } from './components/gestion-usuarios/gestion-usuarios.component';
import { AgregarEditarUsuarioComponent } from './modals/agregar-editar-usuario/agregar-editar-usuario.component';


@NgModule({
  declarations: [
    GestionUsuariosComponent,
    AgregarEditarUsuarioComponent
  ],
  imports: [
    CommonModule,
    AdministracionUsuariosRoutingModule
  ]
})
export class AdministracionUsuariosModule { }
