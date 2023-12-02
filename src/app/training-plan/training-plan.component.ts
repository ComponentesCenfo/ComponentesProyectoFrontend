import {Component, OnInit} from '@angular/core';
import { TrainingPlanServiceService } from '../Services/training-plan.service';
import { UserService } from '../Services/user.service';
import { ExerciseService } from '../Services/exercise.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-training-plan',
  templateUrl: './training-plan.component.html',
  styleUrls: ['./training-plan.component.css']
})
export class TrainingPlanComponent implements OnInit{
  trainingPlan = {
    client_Id: '',
    trainer_Id: '',
    startDate : '',
    endDate : '',
    exerciseList: []
  }

  exerciseCriteria = {

    exerciseId: '',
    trainingPlanId:'',
    repetitions: '',
    series: ''
  }

  
  public exercises: any[];
  public clients : any[];
  public lines: any[];
  public showRutinaGrid: boolean = false;
  constructor(private exerciseService: ExerciseService, private trainingPlanService:TrainingPlanServiceService, private userService:UserService){
    this.clients = [];
    this.exercises = []
    this.lines = []
  }

  ngOnInit(): void {
    this.getAllClients()
    this.getAllExercises()
    this.addLine()
    this.addExercises()
  }

  getAllClients(): void{
    this.userService.getClients().subscribe((response: any) => {
      this.clients = response;
    });
  }

  getAllExercises(): void{
    this.exerciseService.getAllExercises().subscribe((response: any)=>{
      this.exercises = response;
    })
  };

  private getClientId(): void{
    const id = document.getElementById("clienteDropdown") as HTMLInputElement;
    this.trainingPlan.client_Id = id.value;

  }
  private obtenerFechaInicio(): string {
    const fechaInicio = document.getElementById("fechaInicio") as HTMLInputElement;

    this.trainingPlan.startDate = fechaInicio.value;

    return this.trainingPlan.endDate;
  }

  private obtenerFechaFin(): string {
    const fechaFin = document.getElementById("fechaFin") as HTMLInputElement;
    
    this.trainingPlan.endDate = fechaFin.value;
    
    return this.trainingPlan.endDate;
  }

  private addExercises(): void{
    
    
    
    this.trainingPlan.exerciseList = [];

  // Recorrer cada línea y agregar el ejercicio correspondiente
    this.lines.forEach((line: any) => {
    const exerciseId = (document.getElementById("exerciseSelection") as HTMLSelectElement).value;
    //const repetitions = (line.querySelector('input[placeholder="Repeticiones"]') as HTMLInputElement).value;
    //const series = (line.querySelector('input[placeholder="Series"]') as HTMLInputElement).value;

    // Verificar si los campos no están vacíos antes de agregar el ejercicio
    if (exerciseId) {
      const exercise = {
        exerciseId: exerciseId,
       // repetitions: repetitions,
        //series: series
      };
      this.exercises.push(exerciseId);
      
    }
  });
  this.exercises = this.trainingPlan.exerciseList

  // Imprimir la lista de ejercicios en la consola para verificar
  console.log(this.trainingPlan.exerciseList);

  }

  addLine():void {
    this.lines.push({

    });
  }
  formSubmit(): void{
    this.getClientId()
    this.obtenerFechaFin()
    this.obtenerFechaInicio()
    if (this.trainingPlan.client_Id && this.trainingPlan.startDate && this.trainingPlan.endDate)
    {
      Swal.fire({
        title: 'Cliente y fechas agregados con éxito',
        text: 'Proceda a incluir los ejercicios',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: 'green',
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(this.trainingPlan)
          this.trainingPlanService.createTrainingPlan(this.trainingPlan).subscribe()
          this.showRutinaGrid = true;
        }
      });
      return;
    }
  }
}

 