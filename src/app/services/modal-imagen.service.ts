import { Injectable, EventEmitter } from '@angular/core';

import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ModalImagenService {
  private _ocultarModal: boolean = true;
  public baseUrl: string = environment.base_url;

  public tipo!: 'usuarios' | 'medicos' | 'hospitales';
  public id: string | undefined;
  public img!: string;

  public imagenCambiada: EventEmitter<string> = new EventEmitter();

  get ocultarModal() {
    return this._ocultarModal;
  }

  constructor() {}

  abrirModal(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    img: any,
    id?: string
  ) {
    this.tipo = tipo;
    this.id = id;

    this.img = img.includes('https')
      ? img
      : `${this.baseUrl}/uploads/${this.tipo}/${img}`;

    this._ocultarModal = false;
  }

  cerrarModal() {
    this._ocultarModal = true;
  }
}
