import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { LoginService } from '../Services/login.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public clientId = 0;
  public userData: any = {};
  public isEditMode = false; // Variable para rastrear el modo de edición

  constructor(private userService: UserService, private loginService:LoginService) { }

  ngOnInit() {
    const userClientJSON = localStorage.getItem('userClient');
    if (userClientJSON) {
      this.userData = JSON.parse(userClientJSON);
      this.clientId = this.userData.id;
    }
  }

  public enableEdit(): void {
    this.isEditMode = true; 
  }

  public saveProfile(): void {
    const updatedUserData = {
      id: this.userData.id,
      email: this.userData.email,
      firstName: this.userData.firstName,
      lastName: this.userData.lastName,
      age: this.userData.age,
      height: this.userData.height,
      weight: this.userData.weight,
      phone: Number(this.userData.phone),
      sex: this.userData.sex,
      password: this.userData.password,
    };
    localStorage.setItem('userClient', JSON.stringify(updatedUserData));
    this.userService.editClient(this.clientId, updatedUserData).subscribe(() => {
    });

    this.isEditMode = false; 
  }
}