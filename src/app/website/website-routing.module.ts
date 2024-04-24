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
            // {
            //     path: 'menu',
            //     loadChildren: () =>
            //         import('./pages/menu/menu.module')
            //             .then(adS => adS.MenuModule),
            //     // canActivate: [EstaLogeadoGuard],
            //     data: {
            //         breadcrumb: 'administradores'
            //     }
            // },
            // {
            //     path: '**',
            //     redirectTo: 'administracion-usuarios'
            // },
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
