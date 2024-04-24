import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormularioInicioSesionComponent } from "./components/formulario-inicio-sesion/formulario-inicio-sesion.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "inicio-sesion",
  },
  {
    path: "inicio-sesion",
    data: {
      titulo: "Mis productos",
      botonRegresar: false,
    },
    component: FormularioInicioSesionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
