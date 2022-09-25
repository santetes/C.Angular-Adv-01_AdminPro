import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.usuarioService.validarToken().pipe(
      tap((isAutenticated) => {
        if (!isAutenticated) {
          console.log('no esta autenticado');
          this.router.navigateByUrl('/login');
        }
      })
    ); //No hace falta subscribire. La petición va  a manejar la subscripción
  }
}
