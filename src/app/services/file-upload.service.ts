import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  public baseUrl = environment.base_url;
  constructor() {}

  //En este caso en lugar de utilizar httpRequest, vamos a utilizar Fetch
  async actualizarFoto(
    file: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ) {
    try {
      const url = `${this.baseUrl}/uploads/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen', file);
      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('x-token') || '',
        },
        body: formData,
      });

      const data = await resp.json();
      if (data.ok) {
        return data.nombreArchivo;
      } else {
        return false;
      }
    } catch (error) {
      console.log('error', error);
      return false;
    }
  }
}
