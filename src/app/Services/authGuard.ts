import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const userRole = this.getUserRole();
    const isLoggedIn = this.isUserLoggedIn();
    const path = route.routeConfig?.path ?? '';
    const allowedRoles = route.data['roles'] as string[];


    // Comprobación para rutas base
    if (['login', 'register', 'trainerRegister', ''].includes(path)) {
      if (isLoggedIn) {
        this.redirectBasedOnRole(userRole);
        return false;
      }
      return true;
    }

    // Comprobación para otras rutas
    if (isLoggedIn) {
        if (allowedRoles && allowedRoles.includes(userRole)) {
          return true;
        }
        this.redirectBasedOnRole(userRole);
        return false;
      }

    // Redirige a la página de login si el usuario no está logueado
    this.router.navigate(['/']);
    return false;
  }

    getUserRole(): string {
    if (localStorage.getItem('userClient')) {
      return 'userClient';
    } else if (localStorage.getItem('userTrainer')) {
      return 'userTrainer';
    }
    return '';
  }

    isUserLoggedIn(): boolean {
    return localStorage.getItem('userClient') || localStorage.getItem('userTrainer') ? true : false;
  }

  private redirectBasedOnRole(role: string): void {
    if (role === 'userClient') {
      this.router.navigate(['/client']);
    } else if (role === 'userTrainer') {
      this.router.navigate(['/trainer']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
