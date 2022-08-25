import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { GraficaDonaComponent } from './grafica-dona/grafica-dona.component';

@NgModule({
  declarations: [IncrementadorComponent, GraficaDonaComponent],
  imports: [CommonModule, FormsModule, NgChartsModule],
  exports: [IncrementadorComponent, GraficaDonaComponent],
})
export class ComponentsModule {}
