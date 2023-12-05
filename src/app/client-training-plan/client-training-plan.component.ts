import { Component, OnInit } from '@angular/core';
import { TrainingPlanServiceService } from '../Services/training-plan.service'; // Asegúrate de importar correctamente
import { TrainingPlan } from './client-training-plan.model';

@Component({
  selector: 'app-client-training-plan',
  templateUrl: './client-training-plan.component.html',
  styleUrls: ['./client-training-plan.component.css']
})
export class ClientTrainingPlanComponent implements OnInit {
  trainingPlan: TrainingPlan  | undefined;
  allTrainingPlans: TrainingPlan[] = [];
  showAllTrainingPlans: boolean = false;


  constructor(private trainingPlanService: TrainingPlanServiceService) {}

  ngOnInit() {
    const userClientJSON = localStorage.getItem('userClient'); 
    if (userClientJSON){
      const userClient = JSON.parse(userClientJSON)
      const userClientId = userClient.id;
      this.getLatestTrainingPlan(userClientId); 
      this.loadAllTrainingPlans(userClientId); 
    }
    
  }

  getLatestTrainingPlan(client_id: number) {
    this.trainingPlanService.getLatestTrainingPlanByClientId(client_id).subscribe(
      data => {
        this.trainingPlan = data;
      },
      error => {
        console.error('Error while retrieving the training plan', error);
      }
    );
  }
  loadAllTrainingPlans(client_id: number) {
    this.trainingPlanService.getAllTrainingPlanByClientId(client_id).subscribe(
      data => {
        this.allTrainingPlans = data;
      },
      error => {
        console.error('Error while retrieving all training plans', error);
      }
    );
  }
  toggleTrainingPlansVisibility() {
    this.showAllTrainingPlans = !this.showAllTrainingPlans;
  }
}