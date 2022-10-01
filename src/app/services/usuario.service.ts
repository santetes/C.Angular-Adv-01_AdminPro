import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/registerForm.interface';
import { environment } from '../../environments/environment';
import { loginForm } from '../interfaces/loginForm.interface';
import { tap, map, Observable, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public usuario!: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {}

  logOut() {
    localStorage.removeItem('x-token');

    google.accounts.id.revoke('sanmartgon@gmail.com', () => {
      this.ngZone.run(() => {
        //La utilización de ngZOne hace que se navegue correctamente cuando se utilizan librerias de terceros (google) - sino no cargaria correctamente la página
        this.router.navigateByUrl('/login');
      });
    });

    this.router.navigateByUrl('/login');
  }

  crearUsuario(formData: RegisterForm) {
    return this.http
      .post(`${base_url}/usuarios`, formData, {
        observe: 'response',
        //Observe: 'response' sireve para que en la respuesta me envie toda la información en lugar de sólamente el body
      })
      .pipe(tap((res: any) => localStorage.setItem('x-token', res.body.token)));
  }

  actualizarUsuario(data: { nombre: string; email: string }) {
    const token = localStorage.getItem('x-token') || '';

    return this.http.put(
      `${base_url}/usuarios/${this.usuario.uid}`,
      { ...data, role: 'USER_ROLE' },
      {
        headers: { 'x-token': token },
        observe: 'response',
      }
    );
  }

  loginUsuario(formData: loginForm) {
    return this.http
      .post(`${base_url}/login`, formData, {
        observe: 'response',
      })
      .pipe(tap((res: any) => localStorage.setItem('x-token', res.body.jwt)));
  }

  loginGoogle(token: string) {
    return this.http
      .post(
        `${base_url}/login/google`,
        { token },
        {
          observe: 'response',
        }
      )
      .pipe(tap((res: any) => localStorage.setItem('x-token', res.body.token)));
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('x-token') || '';
    return this.http
      .get(`${base_url}/login/renew`, {
        headers: { 'x-token': token },
        observe: 'response',
      })
      .pipe(
        map((res: any) => {
          const { nombre, email, google, role, uid, img } = res.body.usuario;
          this.usuario = new Usuario(nombre, email, '', img, google, uid, role);

          localStorage.setItem('x-token', res.body.token);
          return true;
        }),

        catchError((err) => of(false))
      );
  }
}
