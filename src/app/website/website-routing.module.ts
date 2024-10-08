import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./components/layout/layout.component";
import {EstaLogeadoGuard} from "../core/services/guards/esta-logeado.guard";

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./pages/login/login.module')
                .then(mod => mod.LoginModule)
    },
    {
        path: 'menu',
        component: LayoutComponent,
        // canActivate: [EstaLogeadoGuard],
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./pages/menu/menu.module')
                        .then(adS => adS.MenuModule),
            },
        ]
    },
    {
        path: '**',
        redirectTo: ''
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WebsiteRoutingModule {
}
