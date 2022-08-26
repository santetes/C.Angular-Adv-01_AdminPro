import { Component, Input, OnChanges } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-grafica-dona',
  templateUrl: './grafica-dona.component.html',
  styles: [],
})
export class GraficaDonaComponent implements OnChanges {
  @Input() titulo: string = 'default tittle';
  @Input() labels!: string[];
  @Input() values: number[] = [10, 10, 10];
  @Input() colors: string[] = ['#000000', '#222222', '#aaaaaa'];

  public doughnutChartData!: ChartData<'doughnut'>;

  ngOnChanges() {
    this.doughnutChartData = {
      labels: this.labels,
      datasets: [{ data: this.values, backgroundColor: this.colors }],
    };
  }
}
