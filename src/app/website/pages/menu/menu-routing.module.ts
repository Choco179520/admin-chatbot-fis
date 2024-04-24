import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "administracion-usuarios",
    loadChildren: () =>
      import(
        "./pages/administracion-usuarios/administracion-usuarios.module"
      ).then((mod) => mod.AdministracionUsuariosModule),
  },
  {
    path: "configuracion",
    loadChildren: () =>
      import("./pages/configuracion/configuracion.module").then(
        (mod) => mod.ConfiguracionModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}
