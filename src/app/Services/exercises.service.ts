import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from './helper';

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {

  constructor(private httpClient: HttpClient) { }

  public getAllExercises(): Observable<any> {
    return this.httpClient.get(`${baseUrl()}/allExercises`);
  }

  public createExercise(exercise: any): Observable<any> {
    return this.httpClient.post(`${baseUrl()}/createExercise`, exercise);
  }

  public getExerciseByName(name: string): Observable<any> {
    return this.httpClient.get(`${baseUrl()}/exercise/byName/${name}`);
  }

  public editExercise(id: number, exercise: any): Observable<any> {
    return this.httpClient.put(`${baseUrl()}/editExercise/${id}`, exercise);
  }

  public deleteExercise(id: number): Observable<any> {
    return this.httpClient.delete(`${baseUrl()}/deleteExercise/${id}`);
  }
}
