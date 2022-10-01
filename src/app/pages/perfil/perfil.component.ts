import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [],
})
export class PerfilComponent implements OnInit {
  public profileForm!: FormGroup;
  public usuario!: Usuario;
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil() {
    const data = this.profileForm.value;
    this.usuarioService.actualizarUsuario(data).subscribe({
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
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.error.msg}`,
        });
      },
    });
  }
}
