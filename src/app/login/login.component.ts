import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../Services/user.service';
import { LoginService } from '../Services/login.service';
import { TrainerService } from '../Services/trainer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginData = {
    email: '',
    password: '',
  };

  constructor(private userService:UserService, private loginService:LoginService, private trainerService: TrainerService) {
  }

  ngOnInit(): void {
  }

  formSubmit() {
    if (!this.loginData.email)
    {
      Swal.fire({
        title: 'El email es requerido',
        text: 'Por favor ingrese su email',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: 'green',
      }).then((result) => {
        if (result.isConfirmed) {
          // El usuario hizo clic en "Aceptar"
        }
      });
      return;
    }

    // Expresión regular para validar correos electrónicos
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    if (!emailRegex.test(this.loginData.email)) {
      Swal.fire({
        title: 'No corresponde a un email válido',
        text: 'Por favor intente nuevamente',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: 'green',
      }).then((result) => {
        if (result.isConfirmed) {
          // El usuario hizo clic en "Aceptar"
        }
      });
      return;
    }
    if (!this.loginData.password) {
      Swal.fire({
        title: 'La contraseña es requerida',
        text: 'Por favor ingrese su contraseña',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: 'Green',
      }).then((result) => {
        if (result.isConfirmed) {
          // El usuario hizo clic en "Aceptar"
        }
      });
      return;
    }
    
    this.userService.getUserByEmail(this.loginData.email).subscribe(
      (response: any) => {
        // Assuming 'response' will be null or empty if no user is found
        if (response) {
          this.loginService.setUserClient(response);
          if (this.loginData.email === response.email && this.loginData.password === response.password) {
            window.location.href = "/client";
          } else {
            this.showInvalidCredentialsAlert();
          }
        }
      },
      (error) => {
        // Handle error scenario
        this.checkForTrainer();
      }
    );
  }
  private checkForTrainer() {
    this.trainerService.getTrainerByEmail(this.loginData.email).subscribe(
      (trainerResponse: any) => {
        if (trainerResponse) {
          this.loginService.setUserTrainer(trainerResponse);
          if (this.loginData.email === trainerResponse.email && this.loginData.password === trainerResponse.password) {
            window.location.href = "/trainer";
          } else {
            this.showInvalidCredentialsAlert();
          }
        } else {
          // No trainer found either
          this.showInvalidCredentialsAlert();
        }
      },
      (error: any) => {
        // Handle error scenario
        this.showInvalidCredentialsAlert();
      }
    );
  }
  
  private showInvalidCredentialsAlert() {
    Swal.fire({
      title: 'Credenciales inválidos',
      text: 'Lo sentimos, no pudimos procesar tus credenciales en este momento. Por favor, inténtalo de nuevo más tarde o comunícate con el soporte técnico si el problema persiste.',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: 'Red',
    })
  }
}