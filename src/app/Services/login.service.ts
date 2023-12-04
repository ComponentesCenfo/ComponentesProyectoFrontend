import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })
  export class LoginService {


    public setUserClient(user: any) {
        localStorage.setItem('userClient', JSON.stringify(user));
    }
    public setUserTrainer(user: any) {
        localStorage.setItem('userTrainer', JSON.stringify(user));
    }

    public getUser() {
      let userStr = localStorage.getItem('userClient') || localStorage.getItem('userTrainer');;      
      if (userStr != null) {
          return JSON.parse(userStr);
      } else {
          return null;
      }
    }
  
  }
