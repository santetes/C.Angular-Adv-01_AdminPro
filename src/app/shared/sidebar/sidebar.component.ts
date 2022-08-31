import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  public menuItems!: any[];
  get longitudSubmenu() {
    return this.menuItems[0].submenu.length;
  }

  constructor(private sidebarService: SidebarService) {
    this.menuItems = this.sidebarService.menu;
  }

  ngOnInit(): void {}
}
