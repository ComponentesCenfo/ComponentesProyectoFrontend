import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TrainerService } from '../Services/trainer.service';

@Component({
  selector: 'app-trainer-register',
  templateUrl: './trainer-register.component.html',
  styleUrls: ['./trainer-register.component.css']
})
export class TrainerRegisterComponent {
  registerData ={
    email : '',
    firstName : '',
    lastName : '',
    phone : 0,
    password : ''
  }
  passwordRepeat = ''

  constructor(
    private router : Router,
    private trainerService : TrainerService
  ){}
 
  ngOnInit(): void {
  }

  formSubmit(){
    if (!this.registerData.email || !this.registerData.firstName || !this.registerData.lastName || !this.registerData.phone || !this.registerData.password)
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

    this.trainerService.addUser(this.registerData).subscribe(
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
