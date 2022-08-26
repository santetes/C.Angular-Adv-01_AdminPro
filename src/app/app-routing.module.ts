import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages-routing.module';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { AuthRoutingModule } from './auth/auth-routing.module';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '**',
    component: NopagefoundComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes), //**_NopagefoundComponent
    PagesRoutingModule, //''_dashboard_progress_grafica1
    AuthRoutingModule, //auth_register
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
