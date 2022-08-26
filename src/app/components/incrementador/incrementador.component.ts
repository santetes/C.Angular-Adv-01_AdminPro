import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [],
})
export class IncrementadorComponent {
  @Input() progreso: number = 50;
  @Input() btnClass: string = 'btn-primary';

  @Output() nuevoValor = new EventEmitter<number>();

  cambiarValor(valor: number) {
    if (this.progreso >= 100 && valor >= 0) {
      this.progreso = 100;
      this.nuevoValor.emit(this.progreso);
      return;
    } else {
      if (this.progreso <= 0 && valor <= 0) {
        this.progreso = 0;
        this.nuevoValor.emit(this.progreso);
        return;
      }
    }
    this.progreso = this.progreso + valor;
    this.nuevoValor.emit(this.progreso);
    return;
  }

  onChange(nuevoValor: number) {
    if (nuevoValor >= 100) {
      this.progreso = 100;
    } else if (nuevoValor <= 0) {
      this.progreso = 0;
    } else if (nuevoValor > 0 && nuevoValor < 100) {
      this.progreso = nuevoValor;
    }
    this.nuevoValor.emit(this.progreso);
  }
}
