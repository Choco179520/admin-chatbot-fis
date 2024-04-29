import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {MaterialModule} from "../material/material.module";
import {PrimengModule} from "../primeng/primeng.module";
import { UsuarioService } from '../core/services/rest/usuario.service';

@NgModule({
    declarations: [

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
        ReactiveFormsModule
    ],
    providers: [
        UsuarioService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {
}
