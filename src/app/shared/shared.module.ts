import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { PrimengModule } from "../primeng/primeng.module";
import { UsuarioService } from "../core/services/rest/usuario.service";
import { TarjetaNivelesComponent } from "./components/tarjeta-niveles/tarjeta-niveles.component";
import { CrearEditarNivelesComponent } from "./components/crear-editar-niveles/crear-editar-niveles.component";
import { TituloPipe } from "../core/pipes/titulo.pipe";
import { TarjetaUltimoNivelComponent } from "./components/tarjeta-ultimo-nivel/tarjeta-ultimo-nivel.component";
import { DisableForRolesDirective } from "../core/directives/disable-for-roles.directive";
import { AuthService } from "../core/services/rest/auth.service";

@NgModule({
  declarations: [
    TarjetaNivelesComponent,
    CrearEditarNivelesComponent,
    TarjetaUltimoNivelComponent,
    TituloPipe,
    DisableForRolesDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    PrimengModule,
  ],
  exports: [
    MaterialModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    TarjetaNivelesComponent,
    CrearEditarNivelesComponent,
    TarjetaUltimoNivelComponent,
    TituloPipe,
    DisableForRolesDirective,
  ],
  providers: [UsuarioService, AuthService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
