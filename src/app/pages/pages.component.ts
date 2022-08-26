import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const themeElement = document.getElementById('theme');
    const theme =
      localStorage.getItem('theme') ?? './assets/css/colors/purple-dark.css';
    themeElement?.setAttribute('href', theme);
  }
}
