export interface EmpresaInterface {
    codigoEmpresa?: string;
    colorAlterno?: string;
    colorPrimario?: string;
    colorSecundario?: string;
    ruc?: string;
    email?: string;
    estado?: number;
    fechaRegistro?: string;
    icono?: string;
    id?: number;
    nombre?: string;
    representanteLegal?: string;
    telefono?: string;
}

export interface ModuloInterface {
    id?: number;
    nombre: string;
    estado?: 1 | 0;
    descripcion?: string;
    codigoModulo: string;
    fechaRegistro?: string;
    nivel?: number;
    hijo?: ModuloInterface[];
    padre?: number;
    icono?: string;
    path?: string;
}

export interface ModulosPorEmpresaInterface {
    id?: number;
    estado?: number;
    fechaRegistro?: string;
    empresa?: EmpresaInterface;
    modulo?: ModuloInterface
}

export interface UsuarioInterface {
    id?: number;
    nombre?: string;
    fechaRegistro?: string;
    estado?: number;
    email?: string;
    fechaUltimoAcceso?: string;
    rol?: string;
    telefono?: string;
}
