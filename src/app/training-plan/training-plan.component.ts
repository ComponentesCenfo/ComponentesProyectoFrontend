import { Component, OnInit } from '@angular/core';
import { TrainingPlanServiceService } from '../Services/training-plan.service';
import { UserService } from '../Services/user.service';
import { ExerciseService } from '../Services/exercise.service';
import Swal from 'sweetalert2';
import { TrainingPlan, Client  } from '../client-training-plan/client-training-plan.model';

interface ClientTrainingPlansAccumulator {
  [key: number]: TrainingPlan[];
}

@Component({
  selector: 'app-training-plan',
  templateUrl: './training-plan.component.html',
  styleUrls: ['./training-plan.component.css']
})
export class TrainingPlanComponent implements OnInit {
  trainingPlan: any = {
    client: { id: '' },
    trainer: { id: '' },
    startDate: '',
    endDate: '',
    exerciseList: []
  };

   groupedTrainingPlans: any = {};
   exercises: any[];
   clients: any[];
   lines: any[];
   trainerPlans: any[];
   showTrainerPlans: boolean = false;
   clientsWithPlans: any[] = [];
  isUpdating: boolean = false;


  constructor(private exerciseService: ExerciseService, private trainingPlanService: TrainingPlanServiceService, private userService: UserService) {
    this.clients = [];
    this.exercises = [];
    this.lines = [{ exerciseId: '', reps: '', series: '' }];
    this.trainerPlans = [];
    this.showTrainerPlans = false;
  }

  ngOnInit(): void {
    this.getAllClients();
    this.getAllExercises();
  }

  getAllClients(): void {
    this.userService.getClients().subscribe((response: any) => {
      this.clients = response;
    });
  }

  getAllExercises(): void {
    this.exerciseService.getAllExercises().subscribe((response: any) => {
      this.exercises = response;
    });
  }

  addLine(): void {
    this.lines.push({ exerciseId: '', reps: '', series: '' });
  }

  formSubmit(): void {
    const storedData = localStorage.getItem('userTrainer');
    if (storedData !== null) {
      const trainerId = JSON.parse(storedData);
      this.trainingPlan.trainer.id = trainerId.id;
    }

    if (this.trainingPlan.client.id && this.trainingPlan.startDate && this.trainingPlan.endDate && this.trainingPlan.trainer.id) {
      this.trainingPlanService.createTrainingPlan(this.trainingPlan).subscribe((response: any) => {
        if (response && response.trainingPlan_id) {
          this.addExercises(response.trainingPlan_id);
        } else {
          console.error('Error creating the training plan:', response);
        }
        this.refreshTrainerPlans();
      }, error => console.error('API error:', error));
    } else {
      console.error('Missing client, trainer or date data.');
    }
  }

  private addExercises(trainingPlanId: string): void {
    this.lines.forEach((line: any) => {
      let exerciseCriteria = {
        exercise: { id: line.exerciseId },
        trainingPlan: { trainingPlan_id: trainingPlanId },
        repetitions: line.reps,
        series: line.series
      };

      this.exerciseService.createExerciseCriteria(exerciseCriteria).subscribe(
        (response: any) => Swal.fire({
          title: 'Exercise criteria added successfully',
          text: 'All criteria have been added to the training plan.',
          icon: 'success'
        })
        ,
        error => console.error('API error:', error)
      );
    });
  }
  loadTrainerPlans(): void {
    if (this.clientsWithPlans.length > 0) {
      this.showTrainerPlans = !this.showTrainerPlans;
      return;
    }

    const storedData = localStorage.getItem('userTrainer');
    if (storedData) {
      const trainerId = JSON.parse(storedData).id;
      this.trainingPlanService.getAllTrainingPlanByTrainerId(trainerId).subscribe(
        (trainingPlans: any[]) => {
          this.clientsWithPlans = this.groupTrainingPlansByClient(trainingPlans);
          this.showTrainerPlans = true;
        },
        error => console.error('Error loading training plans:', error)
      );
    }
  }

  private groupTrainingPlansByClient(trainingPlans: TrainingPlan[]): any[] {
    const clientGroups = trainingPlans.reduce((acc: ClientTrainingPlansAccumulator, plan) => {
      (acc[plan.client.id] = acc[plan.client.id] || []).push(plan);
      return acc;
    }, {});
  
    return Object.entries(clientGroups).map(([clientId, plans]: [string, TrainingPlan[]]) => ({
      clientId: parseInt(clientId),
      clientName: plans[0].client.firstName + ' ' + plans[0].client.lastName,
      plans: plans
    }));
  }
  refreshTrainerPlans(): void {
    const storedData = localStorage.getItem('userTrainer');
    if (storedData) {
      const trainerId = JSON.parse(storedData).id;
      this.trainingPlanService.getAllTrainingPlanByTrainerId(trainerId).subscribe(
        (trainingPlans: TrainingPlan[]) => {
          this.clientsWithPlans = this.groupTrainingPlansByClient(trainingPlans);
          this.showTrainerPlans = true; // Opcional, si quieres mostrar la lista automáticamente
        },
        error => console.error('Error loading training plans:', error)
      );
    }
  }

  selectPlanForEdit(plan: TrainingPlan): void {
    this.trainingPlan = {
      client: { id: plan.client.id },
      trainer: { id: plan.trainer.id }, 
      startDate: plan.startDate,
      endDate: plan.endDate,
      exerciseList: plan.exerciseCriterias 
    };
  
    this.lines = plan.exerciseCriterias.map(criteria => ({
      exerciseId: criteria.exercise.id,
      reps: criteria.repetitions,
      series: criteria.series
    }));
    this.trainingPlan.client.id = plan.client.id;
    this.trainingPlan.trainingPlan_id = plan.trainingPlan_id;

    const clienteDropdown = document.getElementById('clienteDropdown') as HTMLSelectElement;
    clienteDropdown.value = plan.client.id.toString();
    this.isUpdating = true;

  }
  resetForm(): void {
    this.trainingPlan = {
      client: { id: '' },
      trainer: { id: '' },
      startDate: '',
      endDate: '',
      exerciseList: []
    };
    this.lines = [{ exerciseId: '', reps: '', series: '' }];
    this.isUpdating = false; 
  }


  updateTrainingPlan(): void {
    if (this.validateTrainingPlan(this.trainingPlan)) {
      const updatePayload = {
        trainingPlan_id: this.trainingPlan.trainingPlan_id,
        client: { id: this.trainingPlan.client.id },
        trainer: { id: this.trainingPlan.trainer.id },
        startDate: this.trainingPlan.startDate,
        endDate: this.trainingPlan.endDate,
        exerciseCriterias: this.lines.map(line => ({
          exercise: { id: line.exerciseId },
          repetitions: line.reps,
          series: line.series
        }))
      };
  
      this.trainingPlanService.editTrainingPlan(updatePayload).subscribe(
  
        (response: any) => {
          Swal.fire({
            title: 'Training Plan Updated',
            text: 'The training plan has been updated successfully!',
            icon: 'success'
          });
          this.refreshTrainerPlans();
          this.resetForm();
          this.isUpdating = false;
        },
        error => {
          console.error('API error:', error);
          Swal.fire({
            title: 'Update Failed',
            text: 'There was a problem updating the training plan.',
            icon: 'error'
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Missing Data',
        text: 'Please make sure all fields are filled out correctly.',
        icon: 'warning'
      });
    }
  }

  // Método de ayuda para validar el plan de entrenamiento antes de enviar
  validateTrainingPlan(trainingPlan: any): boolean {
    return trainingPlan.client && trainingPlan.client.id
    && trainingPlan.trainer && trainingPlan.trainer.id
    && trainingPlan.startDate
    && trainingPlan.endDate
    && trainingPlan.trainingPlan_id;  }

}
