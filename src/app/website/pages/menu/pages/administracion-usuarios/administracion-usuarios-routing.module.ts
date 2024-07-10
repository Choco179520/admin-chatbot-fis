import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GestionUsuariosComponent } from "./components/gestion-usuarios/gestion-usuarios.component";
import { EstaLogeadoGuard } from "src/app/core/services/guards/esta-logeado.guard";
import { RoleGuard } from "src/app/core/services/guards/rol.guard";

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
      data: { expectedRoles: ["ADMIN"] },
    },
    component: GestionUsuariosComponent,
    canActivate: [EstaLogeadoGuard, RoleGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministracionUsuariosRoutingModule {}
