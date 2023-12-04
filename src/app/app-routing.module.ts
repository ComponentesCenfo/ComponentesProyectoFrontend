import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import { RegisterComponent } from './register/register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TrainerRegisterComponent } from './trainer-register/trainer-register.component';
import { LandingPageClientComponent } from './landing-page-client/landing-page-client.component';
import { LandingPageTrainerComponent } from './landing-page-trainer/landing-page-trainer.component';
const routes: Routes = [
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full'
  },
  {
    path: 'client',
    component: LandingPageClientComponent,
    pathMatch: 'full'
  },
  {
    path: 'trainer',
    component: LandingPageTrainerComponent,
    pathMatch: 'full'
  },
  {
    path: 'trainer-register',
    component:TrainerRegisterComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
