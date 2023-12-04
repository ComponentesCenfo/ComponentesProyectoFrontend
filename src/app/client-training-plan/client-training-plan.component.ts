import { Component, OnInit } from '@angular/core';
import { TrainingPlanServiceService } from '../Services/training-plan.service'; // Asegúrate de importar correctamente
import { TrainingPlan } from './client-training-plan.model';

@Component({
  selector: 'app-client-training-plan',
  templateUrl: './client-training-plan.component.html',
  styleUrls: ['./client-training-plan.component.css']
})
export class ClientTrainingPlanComponent implements OnInit {
  trainingPlan: TrainingPlan | undefined;

  constructor(private trainingPlanService: TrainingPlanServiceService) {}

  ngOnInit() {
    const userClientJSON = localStorage.getItem('userClient'); 
    if (userClientJSON){
      const userClient = JSON.parse(userClientJSON)
      const userClientId = userClient.id;
      this.getTrainingPlan(userClientId); 
    }
  }

  getTrainingPlan(client_id: number) {
    this.trainingPlanService.getTrainingPlan(client_id).subscribe(
      data => {
        this.trainingPlan = data;
      },
      error => {
        console.error('Error while retrieving the training plan', error);
      }
    );
  }
}