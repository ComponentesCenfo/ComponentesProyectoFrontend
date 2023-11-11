import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {baseUrl} from './helper';

@Injectable({
    providedIn: 'root',
})

export class UserService{
    constructor(private httpClient: HttpClient) {}

    public addUser(user: any) {
    return this.httpClient.post(`${baseUrl()}/createClient`, user);
  }
    public getUsers() {
        return this.httpClient.get(`${baseUrl()}/getClients`);
    }
}