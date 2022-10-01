import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFunction(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  //Iniciamos aquí el settingsService para que cargue la configuración del perfil de color al iniciar
  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    customInitFunction();
  }
}
