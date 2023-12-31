import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData ={
    email : '',
    firstName : '',
    lastName : '',
    age : 0,
    phone : 0,
    sex : '',
    weight : 0,
    height : 0,
    password : ''
  }
  passwordRepeat = ''

  constructor(
    private userService : UserService,
    private router : Router
  ){}
 
  ngOnInit(): void {
  }

  formSubmit(){
    if (!this.registerData.email || !this.registerData.firstName || !this.registerData.lastName || !this.registerData.phone || !this.registerData.sex || !this.registerData.age || !this.registerData.password)
    {
      Swal.fire({
        title: 'Todos los campos son obligatorios',
        text: 'Por favor rellene todos los campos en blanco',
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

    if (
      this.registerData.password.trim() != 
      this.passwordRepeat.trim() 
    ) {
      Swal.fire({
        title: 'Las contraseñas son distintas',
        text: 'Por favor asegurese de que ambas contraseñas sean iguales',
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

    this.userService.addUser(this.registerData).subscribe(
      (response) => {
        // Manejo del caso exitoso
        Swal.fire({
          title: 'Usuario guardado',
          text: 'Usuario registrado con éxito.',
          icon: 'success'
        });
        this.router.navigate(['/login']);
      },
      (error) => {
        // Manejo de errores
        let errorMessage = 'Ocurrió un error al registrar el usuario.';
        if (error.status === 400 && error.error === 'El email ya está registrado.') {
          errorMessage = error.error;
        }
        // Mostrar el mensaje de error
        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error'
        });
      }
    );
  }
}
