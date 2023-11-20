import { Component } from '@angular/core';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-landing-page-trainer',
  templateUrl: './landing-page-trainer.component.html',
  styleUrls: ['./landing-page-trainer.component.css']
})
export class LandingPageTrainerComponent {
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
