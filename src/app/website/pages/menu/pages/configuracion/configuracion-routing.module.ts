import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionNivelUnoComponent } from './components/gestion-nivel-uno/gestion-nivel-uno.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "gestion-nivel-1",
  },
  {
    path: "gestion-nivel-1",
    data: {
      titulo: "Mis productos",
      botonRegresar: false,
    },
    component: GestionNivelUnoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
