import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import { RegisterComponent } from './register/register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TrainerRegisterComponent } from './trainer-register/trainer-register.component';
import { LandingPageClientComponent } from './landing-page-client/landing-page-client.component';
import { LandingPageTrainerComponent } from './landing-page-trainer/landing-page-trainer.component';
import { TrainingPlanComponent } from './training-plan/training-plan.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { ClientTrainingPlanComponent } from './client-training-plan/client-training-plan.component';

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
    path: 'exercises',
    component: ExercisesComponent,
    pathMatch: 'full'
  },
  {
    path: 'trainer-register',
    component:TrainerRegisterComponent,
    pathMatch: 'full'
  },
  {
    path: 'trainingPlan',
    component:TrainingPlanComponent,
    pathMatch: 'full'
  },
  {
    path: 'ClientTrainingPlan',
    component:ClientTrainingPlanComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
