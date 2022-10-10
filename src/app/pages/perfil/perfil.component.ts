import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [],
})
export class PerfilComponent implements OnInit {
  public profileForm!: FormGroup;
  public usuario!: Usuario;
  public imagenSubir!: File;
  public imagenTemp: any = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
      archivo: [''],
    });
  }

  actualizarPerfil() {
    const data = this.profileForm.value;

    this.usuarioService.actualizarUsuario(data, this.usuario.uid!).subscribe({
      next: (res) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Tu usuario ha sido actualizado',
          showConfirmButton: false,
          timer: 1500,
        });
        // Cuando actualiza la bbdd, tambien actualizamos el objeto singleton usuario para que se refresque en el resto de la aplicación
        const { nombre, email } = (res.body as any).usuarioActualizado;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.error.msg}`,
        });
      },
    });
  }

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
    this.fileUploadService
      .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid!)
      .then((nombreNuevaImagen) => {
        this.usuario.img = nombreNuevaImagen;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Tu avatar ha sido actualizado correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }
}
