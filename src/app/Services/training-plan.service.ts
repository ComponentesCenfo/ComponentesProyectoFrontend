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
  
  //Para obtener el ultimo plan de entrenamiento del cliente
  public getLatestTrainingPlanByClientId(clientId: number) {
    return this.httpClient.get<TrainingPlan>(`${baseUrl()}/getLatestTrainingPlanByClientId?clientId=${clientId}`);
  }

  //Para obtener todos los planes de entrenamiento del cliente
  public getAllTrainingPlanByClientId(clientId: number) {
    return this.httpClient.get<TrainingPlan[]>(`${baseUrl()}/getAllTrainingPlanByClientId?clientId=${clientId}`);
  }

  //Para obtener todos los planes de entrenamiento del entrenador
  public getAllTrainingPlanByTrainerId(trainerId: number) {
    return this.httpClient.get<TrainingPlan[]>(`${baseUrl()}/getAllTrainingPlanByTrainerId?trainerId=${trainerId}`);
  }

  public editTrainingPlan(trainingPlan:any){
    return this.httpClient.put(`${baseUrl()}/editTrainingPlan`, trainingPlan)
  }

  public deleteTrainingPlan(clientId:any){
    return this.httpClient.delete(`${baseUrl()}/deleteTrainingPlan`, clientId)
  }

  
}
