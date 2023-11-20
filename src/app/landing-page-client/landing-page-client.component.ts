import { Component } from '@angular/core';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-landing-page-client',
  templateUrl: './landing-page-client.component.html',
  styleUrls: ['./landing-page-client.component.css']
})
export class LandingPageClientComponent {
  user: any; 
  firstName: string | null = null;

  constructor(private loginService: LoginService) {
    this.user = this.loginService.getUser();

    // Asignar el firstName si el usuario está disponible
    if (this.user && this.user.firstName) {
      this.firstName = this.user.firstName;
    }
  }
}
