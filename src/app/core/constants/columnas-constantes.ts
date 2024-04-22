export const COLUMNA_TABLA_COMISIONES = [
    //{field: 'id', header: 'N°.'},
    {field: 'entidadFinanciera', header: 'Entidad financiera'},
    {field: 'numeroTransferencias', header: 'Número transferencias'},
    {field: 'valorTransferencias', header: 'Valor transferencias'},
];

export const COLUMNA_TABLA_REPORTE_CLIENTE = [
    // {field: 'id', header: 'N°.'},
    {field: 'nombreSocio', header: 'Nombre del Socio'},
    {field: 'identificacion', header: 'Identificación'},
    {field: 'genero', header: 'Género'},
    {field: 'email', header: 'Correo electrónico'},
    {field: 'telefono', header: 'Teléfono'},
    {field: 'fechaUltimoAcceso', header: 'Fecha Último Acceso'},
    {field: 'acciones', header: 'Acciones'},
];

export const COLUMNA_TABLA_REPORTE_TRANSACCIONES = [
    // {field: 'id', header: 'N°.'},
    {field: 'nombreSocio', header: 'Nombre del Socio'},
    {field: 'identificacion', header: 'Identificación'},
    {field: 'email', header: 'Correo electrónico'},
    {field: 'cuentaOrigen', header: 'Cuenta Origen'},
    {field: 'cuentaDestino', header: 'Cuenta Destino'},
    {field: 'montoTransferencia', header: 'Valor Transferencia'},
    {field: 'observacion', header: 'Observacion'},
    {field: 'tipoTransaccion', header: 'Tipo Transaccion'},
    {field: 'canal', header: 'Canal'},
    {field: 'acciones', header: 'Acciones'},
];

export const COLUMNA_TRANS_DETALLADAS = [
    //{field: 'id', header: 'N°.'},
    {field: 'canal', header: 'Canal'},
    {field: 'numeroTransferencias', header: 'Número transferencias'},
    {field: 'valorTransferencias', header: 'Valor transferencias'},
    {field: 'tipoTransferencia', header: 'Tipo transferencias'}
];

export const COLUMNA_TABLA_USUARIO = [
    //{field: 'id', header: 'N°.'},
    {field: 'nombre', header: 'Información usuario'},
    {field: 'email', header: 'Información adicional'},
    {field: 'estado', header: 'Estado'},
    {field: 'acciones', header: 'Acciones'}
];

export const COLUMNA_TABLA_CLIENTE = [
    {field: 'informacionSocio', header: 'Información socio'},
    {field: 'informacionUsuario', header: 'Información usuario'},
    {field: 'estado', header: 'Estado'},
    {field: 'acciones', header: 'Acciones'}
];


export const CAMPOS_FORMULARIO_TRANS_USUARIO = [
    {
        nombre: 'Transacciones Internas',
        formulario: 'transaccionesInternas',
        campos: [
            {ctrlName: 'montoMaximo', campo: 'Monto Diario', placeholder: 'Ingrese el monto máximo diario'},
            {ctrlName: 'montoMensual', campo: 'Monto Mensual', placeholder: 'Ingrese el monto máximo mensual'},
            {
                ctrlName: 'numeroTransferenciasDiarias',
                campo: 'Número de transferencias diarias',
                placeholder: 'Ingrese el número máximo de trasnferencias diarios'
            },
            {
                ctrlName: 'numeroTransferenciasMensuales',
                campo: 'Número de transferencias mensuales',
                placeholder: 'Ingrese el número máximo de trasnferencias mensuales'
            }
        ]
    },
    {
        nombre: 'Transacciones Externas',
        formulario: 'transaccionesExternas',
        campos: [
            {ctrlName: 'montoMaximo', campo: 'Monto Diario', placeholder: 'Ingrese el monto máximo diario'},
            {ctrlName: 'montoMensual', campo: 'Monto Mensual', placeholder: 'Ingrese el monto máximo mensual'},
            {
                ctrlName: 'numeroTransferenciasDiarias',
                campo: 'Número de transferencias diarias',
                placeholder: 'Ingrese el número máximo de trasnferencias diarios'
            },
            {
                ctrlName: 'numeroTransferenciasMensuales',
                campo: 'Número de transferencias mensuales',
                placeholder: 'Ingrese el número máximo de trasnferencias mensuales'
            }
        ]
    }
];

export const CAMPOS_FORMULARIO_TRANS_GLOBALES = [
    {
        nombre: 'Transacciones Internas Web',
        formulario: 'transaccionesInternasWeb',
        campos: [
            {
                ctrlName: 'montoMaximo',
                campo: 'Monto máximo permitido por cada transacción en el canal WEB',
                placeholder: 'Ingrese monto máximo de transacciones'
            },
            {
                ctrlName: 'montoMinimo',
                campo: 'Monto mínimo permitido por cada transacción en el canal WEB',
                placeholder: 'Ingrese monto minimo de transacciones'
            },
            {
                ctrlName: 'montoDiarioMaximo',
                campo: 'Monto diario máximo permitido en transacciones internas en el canal WEB (por el usuario)',
                placeholder: 'Ingrese monto máximo diario de transacciones'
            },
            {
                ctrlName: 'montoMensualMaximo',
                campo: 'Monto mensual máximo permitido en transacciones internas en el canal WEB (por el usuario)',
                placeholder: 'Ingrese monto máximo mensual de transacciones'
            }
        ]
    },
    {
        nombre: 'Transacciones internas en Aplicaciones Móviles',
        formulario: 'transaccionesInternasMovil',
        campos: [
            {
                ctrlName: 'montoMaximo',
                campo: 'Monto máximo permitido por cada transacción en Apps Móviles',
                placeholder: 'Ingrese monto máximo de transacciones'
            },
            {
                ctrlName: 'montoMinimo',
                campo: 'Monto mínimo permitido por cada transacción en Apps Móviles',
                placeholder: 'Ingrese monto minimo de transacciones'
            },
            {
                ctrlName: 'montoDiarioMaximo',
                campo: 'Monto diario máximo permitido en transacciones internas en Apps Móviles (por el usuario)',
                placeholder: 'Ingrese monto máximo diario de transacciones'
            },
            {
                ctrlName: 'montoMensualMaximo',
                campo: 'Monto mensual máximo permitido en transacciones internas en Apps Móviles (por el usuario)',
                placeholder: 'Ingrese monto máximo mensual de transacciones'
            }
        ]
    },
    {
        nombre: 'Transacciones SPI WEB',
        formulario: 'transaccionesSPIWeb',
        campos: [
            {
                ctrlName: 'montoMaximo',
                campo: 'Monto máximo permitido por cada transacción interinstitucional SPI en canal WEB',
                placeholder: 'Ingrese monto máximo de transacciones'
            },
            {
                ctrlName: 'montoMensual',
                campo: 'Monto mínimo permitido por cada transacción interinstitucional SPI en canal WEB',
                placeholder: 'Ingrese monto minimo de transacciones'
            },
            {
                ctrlName: 'numeroTransferenciasDiarias',
                campo: 'Monto diario máximo permitido en transacciones interinstitucionales SPI en canal WEB (por el usuario)',
                placeholder: 'Ingrese monto máximo diario de transacciones'
            },
            {
                ctrlName: 'numeroTransferenciasMensuales',
                campo: 'Monto mensual máximo permitido en transacciones interinstitucional SPI en canal WEB (por el usuario)',
                placeholder: 'Ingrese monto máximo mensual de transacciones'
            }
        ]
    },
    {
        nombre: 'Transacciones SPI en Aplicaciones Móviles',
        formulario: 'transaccionesSPIMoviles',
        campos: [
            {
                ctrlName: 'montoMaximo',
                campo: 'Monto máximo permitido por cada transacción interinstitucional SPI en Apps Móviles',
                placeholder: 'Ingrese monto máximo de transacciones'
            },
            {
                ctrlName: 'montoMensual',
                campo: 'Monto mínimo permitido por cada transacción interinstitucional SPI en Apps Móviles',
                placeholder: 'Ingrese monto minimo de transacciones'
            },
            {
                ctrlName: 'numeroTransferenciasDiarias',
                campo: 'Monto diario máximo permitido en transacciones interinstitucional SPI en Apps Móviles (por el usuario)',
                placeholder: 'Ingrese monto máximo diario de transacciones'
            },
            {
                ctrlName: 'numeroTransferenciasMensuales',
                campo: 'Monto mensual máximo permitido en transacciones interinstitucional SPI en Apps Móviles (por el usuario)',
                placeholder: 'Ingrese monto máximo mensual de transacciones'
            }
        ]
    }
];

export const CAMPOS_FORMULARIO_GLOBALES = [
    {
        nombre: 'Página WEB',
        formulario: 'paginaWeb',
        campos: [
            {
                ctrlName: 'tiempoOtp',
                campo: 'Tiempo duración mensaje otp',
                placeholder: 'Ingrese tiempo de duración del otp'
            },
            {
                ctrlName: 'tiempoToken',
                campo: 'Tiempo duración token',
                placeholder: 'Ingrese tiempo de duración del token'
            },
            {
                ctrlName: 'tiempoInactividad',
                campo: 'Tiempo cierre sesión por inactividad',
                placeholder: 'Ingrese tiempo para cierre de sesión por inactividad'
            },
        ]
    },
    {
        nombre: 'Dispositivos móviles',
        formulario: 'dispositivosMoviles',
        campos: [
            {
                ctrlName: 'tiempoOtp',
                campo: 'Tiempo duración mensaje otp',
                placeholder: 'Ingrese tiempo de duración del otp'
            },
            {
                ctrlName: 'tiempoToken',
                campo: 'Tiempo duración token',
                placeholder: 'Ingrese tiempo de duración del token'
            },
            {
                ctrlName: 'tiempoInactividad',
                campo: 'Tiempo cierre sesión por inactividad',
                placeholder: 'Ingrese tiempo para cierre de sesión por inactividad'
            },
        ]
    }
];
