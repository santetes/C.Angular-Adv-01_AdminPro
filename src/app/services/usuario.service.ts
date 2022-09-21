import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/registerForm.interface';
import { environment } from '../../environments/environment';
import { loginForm } from '../interfaces/loginForm.interface';
import { tap } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  crearUsuario(formData: RegisterForm) {
    return this.http
      .post(`${base_url}/usuarios`, formData, {
        observe: 'response',
        //Observe: 'response' sireve para que en la respuesta me envie toda la información en lugar de sólamente el body
      })
      .pipe(tap((res: any) => localStorage.setItem('x-token', res.body.token)));
  }

  loginUsuario(formData: loginForm) {
    return this.http
      .post(`${base_url}/login`, formData, {
        observe: 'response',
      })
      .pipe(tap((res: any) => localStorage.setItem('x-token', res.body.jwt)));
  }
}
