import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../Services/user.service';
import { LoginService } from '../Services/login.service';

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

  constructor(private router:Router, private userService:UserService, private loginService:LoginService) {
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
      (response:any) => {
        this.loginService.setUser(response)
        if(this.loginData.email == response.email && this.loginData.password == response.password){
          window.location.href = "/landing-client"
        }else{
          Swal.fire({
            title: 'Credenciales inválidos',
            text: 'Lo sentimos, no pudimos procesar tus credenciales en este momento. Por favor, inténtalo de nuevo más tarde o comunícate con el soporte técnico si el problema persiste.',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: 'pink',
          }).then((result) => {
            if (result.isConfirmed) {
              // El usuario hizo clic en "Aceptar"
            }
          });
        }
      }
    )
    /*this.userService.getUserByEmail(this.loginData.email).subscribe(
      
      (response:any) => {
        const client = response as any;
        client.email === this.loginData.email && client.password === this.loginData.password;
        if(this.loginData.email == client.email && this.loginData.password == client.password){
          window.location.href = '/landing-client';
        }
      }
      
    )*/
    
   // if(this.loginData.email && this.loginData.password){
     // window.location.href = '/landing-client';
    //}

//     this.userService.getClients().subscribe(
//       (clientsResponse: any) => {
//         const clients = clientsResponse as any[]; // Asumiendo que la respuesta es un array
//         const client = clients.find(c => c.email === this.loginData.email && c.password === this.loginData.password);
//         if (client) {
//           // Cliente encontrado
//           this.handleSuccessfulLogin();
//         } else {
//           // Si no se encuentra en clientes, verifica en entrenadores
//           this.userService.getTrainers().subscribe(
//             (trainersResponse: any) => {
//               const trainers = trainersResponse as any[];
//               const trainer = trainers.find(t => t.email === this.loginData.email && t.password === this.loginData.password);
//               if (trainer) {
//                 // Entrenador encontrado
//                 this.handleSuccessfulLogin();
//               } else {
//                 // Usuario no encontrado en ninguna lista
//                 Swal.fire('Login Failed', 'Invalid email or password.', 'error');
//               }
//             },
//             (error) => {
//               // Manejo de errores de la solicitud HTTP
//               Swal.fire('Error', 'User not found.', 'error');
//             }
//           );
//         }
//       },
//       (error) => {
//         // Manejo de errores de la solicitud HTTP
//         Swal.fire('Error', 'User not found.', 'error');
//       }
//     );
//   }

// private handleSuccessfulLogin() {
//   Swal.fire('Login Successful', 'You have been successfully logged in!', 'success');
//   this.router.navigate(['/']); // Navega a la página de inicio o dashboard
//}
    
    
  }
}
