import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {baseUrl} from './helper';

@Injectable({
    providedIn: 'root',
})

export class TrainerService{
    constructor(private httpClient: HttpClient) {}

    public getTrainerByEmail(email:string){
        return this.httpClient.post(`${baseUrl()}/getTrainerByEmail`, email);
    }

    public addUser(user: any) {
        return this.httpClient.post(`${baseUrl()}/createTrainer`, user);
        }
}