import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { GraficaDonaComponent } from './grafica-dona/grafica-dona.component';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';

@NgModule({
  declarations: [
    IncrementadorComponent,
    GraficaDonaComponent,
    ModalImagenComponent,
  ],
  imports: [CommonModule, FormsModule, NgChartsModule],
  exports: [IncrementadorComponent, GraficaDonaComponent, ModalImagenComponent],
})
export class ComponentsModule {}
