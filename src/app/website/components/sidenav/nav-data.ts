import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: './administracion-usuarios/gestion-usuarios',
        icon: 'assets/icons/usuario.svg',
        label: 'ADMINISTRACIÓN USUARIOS',
        items: [
            // {
            //     routeLink: './administracion-usuarios/gestion-usuarios',
            //     label: 'Administradores',
            // }
        ]
    },
    {
        routeLink: './configuracion/gestion-documentos',
        icon: 'assets/icons/configuracion.svg',
        label: 'CONFIGURACIÓN',
        items: [
            // {
            //     routeLink: './configuracion/gestion-nivel-1',
            //     label: 'Módulos',
            // },
        ]
    },
    {
        routeLink: './cerrar-sesion',
        icon: 'assets/icons/logout.svg',
        label: 'CERRAR SESIÓN',
        items: [
            {
                routeLink: '/',
                label: 'Finalizar Sesión',
            },
        ]
    },

];
