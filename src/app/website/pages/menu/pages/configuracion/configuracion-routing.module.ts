import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GestionExpresionesComponent } from "./components/gestion-expresiones/gestion-expresiones.component";
import { GestionRespuestasComponent } from "./components/gestion-respuestas/gestion-respuestas.component";
import { GestionDocumentosComponent } from "./components/gestion-documentos/gestion-documentos.component";
import { EstaLogeadoGuard } from "src/app/core/services/guards/esta-logeado.guard";

const path = "./menu/configuracion/gestion-documentos";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "gestion-documentos",
  },
  {
    path: "gestion-documentos",
    data: {
      path,
      breadcrumb: [
        {
          label: "Gestión Documentos",
        },
      ],
    },
    component: GestionDocumentosComponent,
    canActivate: [EstaLogeadoGuard],
  },
  {
    path: "gestion-documentos/:id/:title/respuestas",
    data: {
      path,
      breadcrumb: [
        {
          label: "Gestión Documentos",
          link: path,
          tabindex: 0,
        },
        {
          label: "Gestión Respuestas",
          disabled: true,
        },
      ],
    },
    component: GestionRespuestasComponent,
    canActivate: [EstaLogeadoGuard],
  },
  {
    path: "gestion-documentos/:id/:title/expresiones",
    data: {
      path,
      breadcrumb: [
        {
          label: "Gestión Documentos",
          link: path,
          tabindex: 0,
        },
        {
          label: "Gestión Expresiones",
          disabled: true,
        },
      ],
    },
    component: GestionExpresionesComponent,
    canActivate: [EstaLogeadoGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionRoutingModule {}
