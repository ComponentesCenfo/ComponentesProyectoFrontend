import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {baseUrl} from './helper';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private httpClient: HttpClient) { }

  public getAllExercises(){
    return this.httpClient.get(`${baseUrl()}/allExercises`)
  }

  public createExerciseCriteria(exerciseCriteria:any){
    return this.httpClient.post(`${baseUrl()}/createExerciseCriteria`, exerciseCriteria)
  }
}
