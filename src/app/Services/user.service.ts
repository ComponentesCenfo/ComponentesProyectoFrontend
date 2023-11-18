import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {baseUrl} from './helper';

@Injectable({
    providedIn: 'root',
})

export class UserService{
    constructor(private httpClient: HttpClient) {}
    
    public getUserByEmail(email:any){
        return this.httpClient.post(`${baseUrl()}/getClientByEmail`, email)
    }
    public addUser(user: any) {
    return this.httpClient.post(`${baseUrl()}/createClient`, user);
    }
    public getClients() {
        return this.httpClient.get(`${baseUrl()}/allClients`);
    }
    public getTrainers() {
        return this.httpClient.get(`${baseUrl()}/allTrainers`);
    }
}