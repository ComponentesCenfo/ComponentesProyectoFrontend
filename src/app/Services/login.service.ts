import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { baseUrl } from './helper';

@Injectable({
    providedIn: 'root',
  })
  export class LoginService {

    constructor(private http: HttpClient){}

    public setUser(user: any) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    public getUser() {
        let userStr = localStorage.getItem('user');
        if (userStr != null) {
          return JSON.parse(userStr);
        } else {
          //this.logout();
          return JSON.parse(<string>{});
        }
    }

    /*public logout() {
        this.http.get(`${baseUrl()}/rest/users/logout`).subscribe((response) => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        });
        return true;
      }*/
}