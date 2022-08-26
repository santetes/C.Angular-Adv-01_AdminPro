import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component {
  public labels1 = ['hombre', 'mujer'];
  public values1 = [25, 80];
  public colors1 = ['#223465', '#982322'];
  public labels2 = ['15-20', '20-25', '25-30'];
  public values2 = [100, 80, 243];
  public colors2 = ['#4B3ADE', '#36DE23', '#DE600D'];
}
