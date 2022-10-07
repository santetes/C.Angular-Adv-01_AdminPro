import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class BusquedasService {
  constructor(private http: HttpClient) {}

  get getToken(): string {
    return localStorage.getItem('x-token') || '';
  }

  get getHeaders() {
    return {
      headers: {
        'x-token': this.getToken,
      },
    };
  }

  get baseUrl(): string {
    return `${environment.base_url}/total/coleccion`;
  }

  transformarUsuario(resp: any[]) {
    const usuarios: Usuario[] = resp.map(
      (user) =>
        new Usuario(
          user.nombre,
          user.email,
          '',
          user.img,
          user.google,
          user.uid,
          user.role
        )
    );

    return usuarios;
  }

  buscar(coleccion: string, termino: string = '') {
    return this.http
      .get<any[]>(`${this.baseUrl}/${coleccion}/${termino}`, this.getHeaders)
      .pipe(
        map((resp: any) => {
          switch (coleccion) {
            case 'usuarios':
              return this.transformarUsuario(resp.resultado);

            default:
              return [];
          }
        })
      );
  }
}
