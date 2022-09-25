import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  NgZone,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('googleBtn') googleBtn!: ElementRef;

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
    private usuarioService: UsuarioService,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit() {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id:
        '1077067861633-8ef1n0sin1nvj07ggmfeda0mu38gsuce.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response), //hay que tener cuidado con el uso del this en los callback
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: 'outline', size: 'large' } // customization attributes
    );
  }

  handleCredentialResponse(response: any) {
    this.usuarioService.loginGoogle(response.credential).subscribe((resp) => {
      //La utilización de ngZOne hace que se navegue correctamente cuando se utilizan librerias de terceros (google) - sino no cargaria correctamente la página

      this.ngZone.run(() => {
        this.router.navigateByUrl('/');
      });
    });
  }

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
      next: (resp) => this.router.navigateByUrl('/'),
      error: (err) => Swal.fire('Error', err.error.msg, 'error'),
    });
  }

  campoNoValido(campo: string): boolean {
    if (this.loginForm.controls[campo].errors && this.formSubmited) {
      return true;
    } else {
      return false;
    }
  }
}
