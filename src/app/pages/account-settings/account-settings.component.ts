import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [],
})
export class AccountSettingsComponent implements OnInit {
  public elementoTheme = document.querySelector('#theme');
  constructor() {}

  ngOnInit(): void {}

  changeTheme(color: string) {
    const url = `./assets/css/colors/${color}.css`;

    this.elementoTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
  }
}
