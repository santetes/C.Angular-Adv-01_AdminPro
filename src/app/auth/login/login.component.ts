import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent {
  private formSubmited: boolean = false;

  public loginForm: FormGroup = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['123456', [Validators.required]],
    remember: false,
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {}

  login() {
    this.formSubmited = true;

    if (this.loginForm.invalid) {
      return;
    }

    if (this.loginForm.controls['remember'].value) {
      localStorage.setItem('email', this.loginForm.get('email')?.value);
    } else {
      localStorage.removeItem('email');
    }

    this.usuarioService.loginUsuario(this.loginForm.value).subscribe({
      next: (resp) => console.log(resp),
      error: (err) => Swal.fire('Error', err.error.msg, 'error'),
    });
    //this.router.navigateByUrl('/');
  }

  campoNoValido(campo: string): boolean {
    if (this.loginForm.controls[campo].errors && this.formSubmited) {
      return true;
    } else {
      return false;
    }
  }
}
