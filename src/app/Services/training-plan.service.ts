import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {baseUrl} from './helper';
import { TrainingPlan } from '../client-training-plan/client-training-plan.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingPlanServiceService {

  constructor(private httpClient: HttpClient) { }
  
  public createTrainingPlan(trainingPlan:any){
    return this.httpClient.post(`${baseUrl()}/createTrainingPlan`, trainingPlan)
  }
  
  public getTrainingPlan(client_id: number) {
    return this.httpClient.get<TrainingPlan>(`${baseUrl()}/getTrainingPlan?client_id=${client_id}`);
  }

  public editTrainingPlan(trainingPlan:any){
    return this.httpClient.post(`${baseUrl()}/editTrainingPlan`, trainingPlan)
  }

  public deleteTrainingPlan(client_id:any){
    return this.httpClient.post(`${baseUrl()}/deleteTrainingPlan`, client_id)
  }

  
}
