import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../Services/authGuard';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router, private authGuard: AuthGuard) {}

  isRoute(route: string) {
      return this.router.url === `/${route}`;
  }
  get isLoggedIn(): boolean {
    return this.authGuard.isUserLoggedIn();
  }
  get userRole(): string {
    return this.authGuard.getUserRole();
  }

  logout(): void {
    localStorage.removeItem('userClient');
    localStorage.removeItem('userTrainer');
  }
}
