import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {MaterialModule} from "../material/material.module";
import {PrimengModule} from "../primeng/primeng.module";


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
    ],
    providers: [
  
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {
}
