import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WebsiteRoutingModule} from "./website-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LayoutComponent} from "./components/layout/layout.component";
import {FooterComponent} from "./components/footer/footer.component";
import {BodyComponent} from './components/body/body.component';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {SublevelMenuComponent} from "./components/sidenav/sublevel-menu.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    declarations: [
        LayoutComponent,
        FooterComponent,
        BodyComponent,
        SidenavComponent,
        SublevelMenuComponent
    ],
    imports: [
        CommonModule,
        WebsiteRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports: [],
    providers: []
})
export class WebsiteModule {
}
