import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: 'menu/administracion-usuarios',
        icon: 'assets/iconos/group.png',
        label: 'ADMINISTRACIÓN USUARIOS',
        items: [
            {
                routeLink: './menu/administracion-usuarios/administradores',
                label: 'Administradores',
            }
        ]
    },
    {
        routeLink: 'menu/configuracion',
        icon: 'assets/iconos/settings.png',
        label: 'CONFIGURACIÓN',
        items: [
            {
                routeLink: './menu/configuracion/modulos',
                label: 'Módulos',
            },
            {
                routeLink: './menu/configuracion/empresas',
                label: 'Empresas',
            }
        ]
    },
    {
        routeLink: 'menu/cerrar-sesion',
        icon: 'assets/iconos/logout.svg',
        label: 'CERRAR SESIÓN',
        items: [
            {
                routeLink: '/',
                label: 'Finalizar Sesión',
            },
        ]
    },

];
