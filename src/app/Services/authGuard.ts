import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

type UserRole = 'userClient' | 'userTrainer' | '';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    private roleRouteMap = {
        'userClient': ['client', 'calculator', 'clientTrainingPlan'],
        'userTrainer': ['trainer', 'exercises', 'trainingPlan', 'calculator'],
        '': ['login', 'register', 'trainerRegister', '']
        };
    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
    const userRole = this.getUserRole();
    const isLoggedIn = this.isUserLoggedIn();
    const path = route.routeConfig?.path ?? '';
    const allowedRoles = route.data['roles'] as string[];

    

    if (['login', 'register', 'trainerRegister', ''].includes(path)) {
      if (isLoggedIn) {
        this.redirectBasedOnRole(userRole);
        return false;
      }
      return true;
    }

    if (isLoggedIn) {
        const allowedRoutes = this.roleRouteMap[userRole];
        if (allowedRoutes.includes(path)) {
            return true;
        }
        this.redirectBasedOnRole(userRole);
        return false;
      }

    return false;
  }

    getUserRole(): UserRole  {
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
