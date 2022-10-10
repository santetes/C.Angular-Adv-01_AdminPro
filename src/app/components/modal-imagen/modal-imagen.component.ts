import { Component } from '@angular/core';
import Swal from 'sweetalert2';

import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [],
})
export class ModalImagenComponent {
  public imagenSubir!: any;
  public imagenTemp: any = null;

  get imagenActual() {
    return this.modalImageService.img;
  }

  constructor(
    public modalImageService: ModalImagenService,
    public fileUploadService: FileUploadService
  ) {}

  cambiarImagen(event: any) {
    this.imagenSubir = event.target.files[0];
    if (!this.imagenSubir) {
      this.imagenTemp = null;
      return;
    }
    // Este bloque de código permite visualizar una imagen directamente desde la carga del archivo (windows) sin ser la imagen del propio modelo de usuario
    const reader = new FileReader();
    reader.readAsDataURL(this.imagenSubir);
    reader.onloadend = () => (this.imagenTemp = reader.result);
  }

  subirImagen() {
    const tipo = this.modalImageService.tipo;
    const uid = this.modalImageService.id;

    this.fileUploadService
      .actualizarFoto(this.imagenSubir, tipo, uid!)
      .then((nombreNuevaImagen) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Tu avatar ha sido actualizado correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
        this.modalImageService.imagenCambiada.emit(nombreNuevaImagen);
        this.imagenTemp = null;
        this.imagenSubir = null;
        this.modalImageService.cerrarModal();
      });
  }

  cerrarModal() {
    this.modalImageService.cerrarModal();
    this.imagenTemp = null;
  }
}
