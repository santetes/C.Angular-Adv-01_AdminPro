import { Component, OnInit } from '@angular/core';

declare function customInitFunction(): void;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    customInitFunction();
  }
  title = 'adminPro';
}
