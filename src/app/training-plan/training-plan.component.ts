import {Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    client: { id:''},
    trainer:{id:''},
    startDate : '',
    endDate : '',
    exerciseList: []
  }

  exerciseCriteria = {
    exercise: {id:''},
    trainingPlan:{trainingPlan_id:''},
    repetitions: '',
    series: ''
  }

  
  public exercises: any[];
  public clients : any[];
  public lines: any[];
  public plan : any[];
  public showRutinaGrid: boolean = false;
  constructor(private exerciseService: ExerciseService, private trainingPlanService:TrainingPlanServiceService, private userService:UserService){
    this.clients = [];
    this.exercises = []
    this.lines = []
    this.plan = []
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
    this.trainingPlan.client.id = id.value;

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

    this.lines.forEach((line: any) => {
      const exerciseId = line.exerciseId;
      const repetitions = line.reps;
      const series = line.series;
      this.exerciseCriteria.exercise.id = exerciseId;
      this.exerciseCriteria.repetitions = repetitions;
      this.exerciseCriteria.series = series;
      this.exerciseCriteria.trainingPlan.trainingPlan_id = this.plan[this.plan.length-1].trainingPlan_id;
      console.log(this.exerciseCriteria)
      this.exerciseService.createExerciseCriteria(this.exerciseCriteria).subscribe();
    });

  }

  addLine():void {
    this.lines.push({

    });
  }
  formSubmit(): void{
    this.getClientId()
    this.obtenerFechaFin()
    this.obtenerFechaInicio()
    const storedData = localStorage.getItem("userTrainer");

    if (storedData !== null) {
      const trainerId = JSON.parse(storedData);
      this.trainingPlan.trainer.id = trainerId.id;
      
    }
    
    if (this.trainingPlan.client.id && this.trainingPlan.startDate && this.trainingPlan.endDate)
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
          this.trainingPlanService.createTrainingPlan(this.trainingPlan).subscribe()
          const client_id = Number(this.trainingPlan.client.id)
          this.trainingPlanService.getTrainingPlan(client_id).subscribe((response:any)=>{
            this.plan = response;
            
            if (response){
              localStorage.setItem('trainingPlan', JSON.stringify(response))
            }
          })
          this.showRutinaGrid = true;
        }
      });
      return;
    }
  }

  exercisesSubmit(){
    this.addExercises()
  }
}

 