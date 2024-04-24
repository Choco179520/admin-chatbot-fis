import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionUsuariosComponent } from './components/gestion-usuarios/gestion-usuarios.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "gestion-usuarios",
  },
  {
    path: "gestion-usuarios",
    data: {
      titulo: "Mis productos",
      botonRegresar: false,
    },
    component: GestionUsuariosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionUsuariosRoutingModule { }
