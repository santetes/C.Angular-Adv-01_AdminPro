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
  public usuario!: Usuario;

  get nombre() {
    return this.usuario.nombre;
  }

  get imagen() {
    return this.usuario.imagenUrl;
  }

  constructor(
    private sidebarService: SidebarService,
    private usuarioService: UsuarioService
  ) {
    this.menuItems = this.sidebarService.menu;
    this.usuario = usuarioService.usuario;
  }

  longitudSubmenu(index: number) {
    return this.menuItems[index].submenu.length;
  }

  logOut() {
    this.usuarioService.logOut();
  }
}
