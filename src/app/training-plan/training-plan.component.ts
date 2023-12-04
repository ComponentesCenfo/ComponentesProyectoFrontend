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
  trainingPlan: any = {
    client: { id: '' },
    trainer: { id: '' },
    startDate: '',
    endDate: '',
    exerciseList: []
  }
  
  exerciseCriteria: any = {
    exercise: { id: '' },
    trainingPlan: { trainingPlan_id: '' },
    repetitions: '',
    series: ''
  }

  public exercises: any[];
  public clients: any[];
  public lines: any[];
  public plan: any[];
  public showRutinaGrid: boolean = false;

  constructor(private exerciseService: ExerciseService, private trainingPlanService: TrainingPlanServiceService, private userService: UserService) {
    this.clients = [];
    this.exercises = [];
    this.lines = [];
    this.plan = [];
  }

  ngOnInit(): void {
    this.getAllClients()
    this.getAllExercises()
    this.addLine()
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

  private addExercises(trainingPlanId: string): void {
    this.lines.forEach((line: any) => {
      const exerciseId = line.exerciseId;
      const repetitions = line.reps;
      const series = line.series;
      this.exerciseCriteria.exercise.id = exerciseId;
      this.exerciseCriteria.repetitions = repetitions;
      this.exerciseCriteria.series = series;
      this.exerciseCriteria.trainingPlan.trainingPlan_id = trainingPlanId;

      this.exerciseService.createExerciseCriteria(this.exerciseCriteria).subscribe((response: any) => {
          Swal.fire({
            title: 'Exercise criteria added successfully',
            text: 'Return to the home page',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Accept',
            confirmButtonColor: 'green',
          
          })
          
        }, error => console.error('API error:', error)
            );
        });
  }

  addLine():void {
    this.lines.push({

    });
  }
  formSubmit(): void {
    // Obtén los IDs del cliente y del entrenador, y las fechas
    this.getClientId();
    this.obtenerFechaInicio();
    this.obtenerFechaFin();
  
    // Obtén el ID del entrenador del almacenamiento local
    const storedData = localStorage.getItem("userTrainer");
    if (storedData !== null) {
      const trainerId = JSON.parse(storedData);
      this.trainingPlan.trainer.id = trainerId.id;
    }
  
    // Verifica que todos los datos necesarios estén presentes
    if (this.trainingPlan.client.id && this.trainingPlan.startDate && this.trainingPlan.endDate) {
      Swal.fire({
        title: 'Client and dates added successfully',
        text: 'Proceed to include the exercises',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Accept',
        confirmButtonColor: 'green',
      }).then((result) => {
        if (result.isConfirmed) {
          // Crea el plan de entrenamiento
          this.trainingPlanService.createTrainingPlan(this.trainingPlan).subscribe((response: any) => {
            // Asegúrate de que la respuesta incluya el ID del plan de entrenamiento
            if (response && response.trainingPlan_id) {
              this.currentTrainingPlanId = response.trainingPlan_id; // Guarda el ID para usarlo después
              this.showRutinaGrid = true;
            } else {
              // Manejo de error en caso de que la respuesta no sea la esperada
              console.error('Error creating the training plan:', response);
            }
          }, error => {
            // Manejo de errores de la API
            console.error('API error:', error);
          });
        }
      });
    } else {
      // Manejo de error si no todos los datos requeridos están presentes
      console.error('Missing client, trainer or date data.');
    }
  }
  

  currentTrainingPlanId: string | undefined;

  exercisesSubmit(): void {
    if (this.currentTrainingPlanId) {
      this.addExercises(this.currentTrainingPlanId);
    } else {
      console.error('No trainingPlanId available for adding exercises.');
      // Maneja el  como sea apropiado
    }
  }  
}

 