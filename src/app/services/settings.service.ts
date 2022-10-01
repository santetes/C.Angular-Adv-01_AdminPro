import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private themeElement = document.getElementById('theme');

  constructor() {
    const theme =
      localStorage.getItem('theme') ?? './assets/css/colors/purple-dark.css';
    this.themeElement!.setAttribute('href', theme);
  }

  changeTheme(color: string) {
    const url = `./assets/css/colors/${color}.css`;

    this.themeElement?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const enlaces: NodeListOf<Element> = document.querySelectorAll('.selector');

    enlaces.forEach((elem) => {
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.themeElement?.getAttribute('href');
      if (btnThemeUrl === currentTheme) {
        elem.classList.add('working');
      }
    });
  }
}
