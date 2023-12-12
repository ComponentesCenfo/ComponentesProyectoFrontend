import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {baseUrl} from './helper';

@Injectable({
    providedIn: 'root',
})

export class UserService{
    constructor(private httpClient: HttpClient) {}
    
    public login(loginData:any){
        return this.httpClient.post(`${baseUrl()}/login`, loginData)
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

    public editClient(id: number, user:any){
        return this.httpClient.put(`${baseUrl()}/editClient/${id}`, user)
    }
}