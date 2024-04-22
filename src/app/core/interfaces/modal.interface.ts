export interface ModalInterface {
  titulo?: string;
  mensaje?: string;
  icono?: 'error' | 'info' | 'question' | 'success' | 'warning';
  colorIcono?: string;
  colorBotonAceptar?: string;
  colorBotonCancelar?: string;
  nombreBotonAceptar?: string;
  mostrarBotonCancelar?: boolean;
  nombreBotonCancelar?: string;
  imageWidth?: number;
  imageHeight?: number;
  width?: number;
  html?: string;
  pathImagen?: string;
}
