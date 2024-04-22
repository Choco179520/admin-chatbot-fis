import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import Swal from 'sweetalert2';
import {ModalInterface} from "../../interfaces/modal.interface";
import {COLOR_PRIMARIO} from "../../constants/colores-constantes";

@Injectable({
    providedIn: 'root'
})
export class ModalGeneralService {
    constructor(private readonly _router: Router) {
    }

    async mensajeImagen(jsonInformacion: any) {
        return await Swal.fire({
            title: `<h3>jsonInformacion.titulo</h3>`,
            imageUrl: jsonInformacion.imagen,
            imageWidth: 300,
            imageHeight: 200,
            confirmButtonColor: '$color-primario',
            imageAlt: 'Custom image',
            html: jsonInformacion.html,
            confirmButtonText: 'Cerrar',
        });
    }

    async mensajeModalError(mensaje: string) {
        return await Swal.fire({
            title: 'ERROR',
            text: mensaje,
            icon: 'error',
            confirmButtonColor: '$color-secundario',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false,
            iconColor: '$color-primario',
        });
    }

    async mensajeModalGeneral(datosModal: ModalInterface): Promise<boolean> {
        const respuestaModal = await Swal.fire({
            title: datosModal?.titulo ? datosModal?.titulo : '',
            text: datosModal.mensaje,
            icon: datosModal.icono,
            cancelButtonColor: datosModal.colorBotonCancelar,
            confirmButtonColor: datosModal.colorBotonAceptar,
            showCancelButton: datosModal.mostrarBotonCancelar ? datosModal.mostrarBotonCancelar : false,
            confirmButtonText: datosModal?.nombreBotonAceptar ? datosModal.nombreBotonAceptar : 'Aceptar',
            cancelButtonText: datosModal?.nombreBotonCancelar ? datosModal?.nombreBotonCancelar : 'Cancelar',
            iconColor: datosModal.colorIcono,
            allowOutsideClick: false,
            width: datosModal.width ? datosModal.width : 1000,
        });
        return respuestaModal.isConfirmed;
    }

    async tiempoTokenVencido(): Promise<any> {
        const respuestaModal = await Swal.fire({
            title: 'ERROR',
            text: `El tiempo para generar su crédito expiro, por favor vuelve a ingresar.`,
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: COLOR_PRIMARIO,
            confirmButtonText: 'Aceptar',
            iconColor: COLOR_PRIMARIO,
            allowOutsideClick: false,
            width: 1000,
            timer: 4500,
            timerProgressBar: true
        });
        return respuestaModal;
    }

    async mensajeTerminosCondiciones() {
        return await Swal.fire({
            padding: '1.2em',
            width: 650,
            html:
                '<h5>Términos y condiciones</h5>' +
                '<embed src="assets/pdf/TerminosCondicionesV2.1.pdf" class="zoom:110%" type="application/pdf" width="110%" height="450px" />',
            showCloseButton: true,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
        })
    }

    async mensajeHtml(datosModal: ModalInterface): Promise<boolean> {
        const respuestaModal = await Swal.fire({
            title: datosModal?.titulo ? datosModal?.titulo : '',
            text: datosModal.mensaje,
            icon: datosModal.icono,
            cancelButtonColor: COLOR_PRIMARIO,
            confirmButtonColor: COLOR_PRIMARIO,
            showCancelButton: datosModal.mostrarBotonCancelar ? datosModal.mostrarBotonCancelar : false,
            confirmButtonText: datosModal?.nombreBotonAceptar ? datosModal.nombreBotonAceptar : 'Aceptar',
            cancelButtonText: datosModal?.nombreBotonCancelar ? datosModal?.nombreBotonCancelar : 'Cancelar',
            html: datosModal.html,
            imageUrl: datosModal.pathImagen,
            imageWidth: datosModal.imageWidth ?? 360,
            imageHeight: datosModal.imageHeight ?? 285,
            imageAlt: 'Custom image',
            iconColor: COLOR_PRIMARIO,
            allowOutsideClick: false,
            width: datosModal.width ? datosModal.width : 1000,
        });
        return respuestaModal.isConfirmed;
    }

    async mensajeFueraServicio(): Promise<boolean> {
        const respuestaModal = await Swal.fire({
            confirmButtonColor: COLOR_PRIMARIO,
            allowOutsideClick: false,
            showConfirmButton: false,
            confirmButtonText: 'Aceptar',
            html:
                `<div class="container-fluid">
      <img
        src="assets/imagenes/RAPIDAZO_fuera_servicio.png"
        style="max-width: 60%"
        >
        <h5>
          <strong>Agradecemos su comprensión,</strong>
        </h5>
        <h5>
        <strong>El servicio se encuentra disponible de 8 AM a 5 PM.</strong>
      </h5>
      <h6><strong>Te esperamos pronto</strong></h6>
      </div>`,
        });
        return respuestaModal.isConfirmed;
    }

    async mensajeFueraServicioAplicativo(): Promise<boolean> {
        const respuestaModal = await Swal.fire({
            confirmButtonColor: COLOR_PRIMARIO,
            allowOutsideClick: false,
            showConfirmButton: false,
            width: '1200px',
            heightAuto: true,
            html:
                `<div class="container-fluid">
      <img
        src="assets/imagenes/RAPIDAZO_fuera_servicio.png"
        style="max-width: 100%"
        >
        <h3>
        <strong style="color: #8a2432">ESTAMOS TRABAJANDO PARA BRINDARTE UN MEJOR SERVICIO, <br>REGRESAREMOS PRONTO</strong>
        </h3>
      </div>`,
        });
        return respuestaModal.isConfirmed;
    }

    async toasterMensaje(icono: 'success' | 'error' | 'warning' | 'info' | 'question', mensaje: string): Promise<any> {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: icono,
            title: mensaje
        })
    }
}
