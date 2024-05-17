import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GestionNivelUnoComponent } from "./components/gestion-nivel-uno/gestion-nivel-uno.component";
import { GestionNivelDosComponent } from "./components/gestion-nivel-dos/gestion-nivel-dos.component";
import { GestionNivelTresComponent } from "./components/gestion-nivel-tres/gestion-nivel-tres.component";
import { GestionExpresionesComponent } from "./components/gestion-expresiones/gestion-expresiones.component";
import { GestionRespuestasComponent } from "./components/gestion-respuestas/gestion-respuestas.component";
import { GestionDocumentosComponent } from "./components/gestion-documentos/gestion-documentos.component";

const path = "./menu/configuracion/gestion-nivel-1";

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
  },
  // {
  //   path: "gestion-nivel-1",
  //   data: {
  //     path,
  //     breadcrumb: [
  //       {
  //         label: "Gestión Nivel 1",
  //       },
  //     ],
  //   },
  //   component: GestionNivelUnoComponent,
  // },
  // {
  //   path: "gestion-nivel-1/:id/gestion-nivel-2",
  //   data: {
  //     path,
  //     breadcrumb: [
  //       {
  //         label: "Gestión Nivel 1",
  //         link: path,
  //         tabindex: 0
  //       },
  //       {
  //         label: "Gestión Nivel 2",
  //         disabled: true
  //       },
  //     ],
  //   },
  //   component: GestionNivelDosComponent,
  // },
  // {
  //   path: "gestion-nivel-1/:id/gestion-nivel-2/:subId/gestion-nivel-3",
  //   data: {
  //     path,
  //     breadcrumb: [
  //       {
  //         label: "Gestión Nivel 1",
  //         link: path,
  //         tabindex: 0
  //       },
  //       {
  //         label: "Gestión Nivel 2",
  //         link: path,
  //         tabindex: 1
  //       },
  //       {
  //         label: "Gestión Nivel 3",
  //         disabled: true
  //       },
  //     ],
  //   },
  //   component: GestionNivelTresComponent,
  // },
  // {
  //   path: "gestion-nivel-1/:id/gestion-nivel-2/:subId/gestion-nivel-3/:nivel3/expresiones",
  //   data: {
  //     path,
  //     breadcrumb: [
  //       {
  //         label: "Gestión Nivel 1",
  //         link: path,
  //         tabindex: 0
  //       },
  //       {
  //         label: "Gestión Nivel 2",
  //         link: path,
  //         tabindex: 1
  //       },
  //       {
  //         label: "Gestión Nivel 3",
  //         link: path,
  //         tabindex: 2
  //       },
  //       {
  //         label: "Gestión Expresiones",
  //         disabled: true,
  //       },
  //     ],
  //   },
  //   component: GestionExpresionesComponent,
  // },
  // {
  //   path: "gestion-nivel-1/:id/gestion-nivel-2/:subId/gestion-nivel-3/:nivel3/respuestas",
  //   data: {
  //     path,
  //     breadcrumb: [
  //       {
  //         label: "Gestión Nivel 1",
  //         link: path,
  //         tabindex: 0
  //       },
  //       {
  //         label: "Gestión Nivel 2",
  //         link: path,
  //         tabindex: 1
  //       },
  //       {
  //         label: "Gestión Nivel 3",
  //         link: path,
  //         tabindex: 2
  //       },
  //       {
  //         label: "Gestión Respuestas",
  //         disabled: true
  //       },
  //     ],
  //   },
  //   component: GestionRespuestasComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionRoutingModule {}
