import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent {
  public menuItems!: any[];
  public imgUrl: string = '';
  public usuario!: Usuario;

  get longitudSubmenu() {
    return this.menuItems[0].submenu.length;
  }

  get nombre() {
    return this.usuario.nombre;
  }

  constructor(
    private sidebarService: SidebarService,
    private usuarioService: UsuarioService
  ) {
    this.menuItems = this.sidebarService.menu;
    this.imgUrl = usuarioService.usuario.imagenUrl;
    this.usuario = usuarioService.usuario;
  }

  logOut() {
    this.usuarioService.logOut();
  }
}
