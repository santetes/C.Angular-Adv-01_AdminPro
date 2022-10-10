import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { catchError, Subscription } from 'rxjs';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public total: number = 0;
  public desde: number = 0;
  public cargando: boolean = true;

  private subsCambioImagen!: Subscription;

  @ViewChild('textoEntrada') textoEntrada!: ElementRef;

  constructor(
    private usuarioService: UsuarioService,
    private busquedaService: BusquedasService,
    private modalImageService: ModalImagenService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();

    this.subsCambioImagen = this.modalImageService.imagenCambiada.subscribe(
      (mombreImagen) => {
        this.cargarUsuarios();
      }
    );
  }

  ngOnDestroy(): void {
    this.subsCambioImagen.unsubscribe();
  }

  cargarUsuarios() {
    this.usuarioService.cargarUsuarios(this.desde).subscribe((res: any) => {
      this.total = res.total;
      this.usuarios = res.usuarios;
      this.usuariosTemp = res.usuarios;
      this.cargando = false;
    });
  }

  siguiente() {
    if (this.desde < this.total - 5) {
      this.cargando = true;
      this.desde += 5;
      this.usuarioService.cargarUsuarios(this.desde).subscribe((res: any) => {
        this.usuarios = res.usuarios;
        this.usuariosTemp = res.usuarios;
        this.cargando = false;
      });
    }
  }
  anterior() {
    if (this.desde > 0) {
      this.cargando = true;
      this.desde -= 5;
      this.usuarioService.cargarUsuarios(this.desde).subscribe((res: any) => {
        this.usuarios = res.usuarios;
        this.usuariosTemp = res.usuarios;
        this.cargando = false;
      });
    }
  }

  buscar(termino: string) {
    if (termino.length == 0) {
      this.usuarios = this.usuariosTemp;
      return;
    }
    this.busquedaService.buscar('usuarios', termino).subscribe((resultados) => {
      this.usuarios = resultados;
    });
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario.uid === this.usuarioService.usuario.uid) {
      Swal.fire('Error', 'No puede borrarse a sí mismo', 'error');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro que quieres borrar este usuario?',
      text: 'Esta operación no se podrá deshacer',
      icon: 'warning',
      showCancelButton: true,

      confirmButtonText: 'Sí, a por él!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.borrarUsuario(usuario).subscribe({
          next: (resp: any) => {
            Swal.fire('Borrado!', resp.body.msg, 'success');
            this.usuarioService
              .cargarUsuarios(this.desde)
              .subscribe((res: any) => {
                this.total = res.total;
                this.usuarios = res.usuarios;
                this.usuariosTemp = res.usuarios;
                this.cargando = false;
              });
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo raro ocurrió en la petición',
            });
          },
        });
      }
    });
  }

  actualizarRole(usuario: Usuario) {
    const data = {
      nombre: usuario.nombre,
      email: usuario.email,
      role: usuario.role,
    };
    this.usuarioService
      .actualizarUsuario(data, usuario.uid!)
      .subscribe((resp) => console.log(resp));
  }

  abrirModal(usuario: Usuario) {
    // si no existe imagen en usuario esta seria undefined y provocaria error. por eso se utiliza Nullish coalescing operator para proteger esto

    usuario.img = usuario.img || 'no-image';
    this.modalImageService.abrirModal('usuarios', usuario.img, usuario.uid);
  }
}
