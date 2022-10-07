import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit {
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public total: number = 0;
  public desde: number = 0;
  public cargando: boolean = true;

  @ViewChild('textoEntrada') textoEntrada!: ElementRef;

  constructor(
    private usuarioService: UsuarioService,
    private busquedaService: BusquedasService
  ) {}

  ngOnInit(): void {
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
      console.log(this.desde);
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

  actualizarRole(usuario: Usuario) {}
}
