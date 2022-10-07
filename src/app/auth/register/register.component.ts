import { Component } from '@angular/core';

import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['register.component.css'],
})
export class RegisterComponent {
  private formSubmited: boolean = false;

  public registerForm: FormGroup = this.fb.group(
    {
      nombre: ['test', [Validators.required]],
      email: ['test@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
      password2: ['123456', Validators.required],
      terminos: [false, Validators.required],
    },
    {
      validators: this.camposPasswordIguales,
    }
  );

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  crearUsuario() {
    this.formSubmited = true;

    if (
      this.registerForm.invalid ||
      this.registerForm.controls['terminos'].value === false
    ) {
      return;
    } else {
      this.usuarioService.crearUsuario(this.registerForm.value).subscribe({
        next: (res) => this.router.navigateByUrl('/'),
        error: (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        },
      });
    }
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.controls[campo].errors && this.formSubmited) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos(): boolean {
    if (!this.registerForm.controls['terminos'].value && this.formSubmited) {
      return true;
    } else {
      return false;
    }
  }

  camposPasswordIguales(formGroup: FormGroup): ValidationErrors | null {
    let pass1 = formGroup.get('password')?.value;
    let pass2 = formGroup.get('password2')?.value;

    if (pass1 === pass2) {
      formGroup.controls['password2'].setErrors(null);
      return null;
    } else {
      formGroup.controls['password2'].setErrors({ sonIguales: false });
      return { sonIguales: false };
    }
  }
}
