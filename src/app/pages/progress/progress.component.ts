import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent {
  valorA: number = 10;
  valorB: number = 60;

  get getValorA() {
    return `${this.valorA}%`;
  }
  get getValorB() {
    return `${this.valorB}%`;
  }
}
