import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LandingPageClientComponent } from './landing-page-client/landing-page-client.component';
import { LandingPageTrainerComponent } from './landing-page-trainer/landing-page-trainer.component';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from './register/register.component';
import { TrainerRegisterComponent } from './trainer-register/trainer-register.component';
import { TrainingPlanComponent } from './training-plan/training-plan.component';
import { ClientTrainingPlanComponent } from './client-training-plan/client-training-plan.component';
import { AuthGuard } from './Services/authGuard';
import { ProfileComponent } from './profile/profile.component';
const routes: Routes = [
  {
    path:'login',
    component:LoginComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]

  },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]

  },
  {
    path: 'client',
    component: LandingPageClientComponent,
    canActivate: [AuthGuard],
    data: { roles: ['userClient'] }
  },
  {
    path: 'trainer',
    component: LandingPageTrainerComponent,
    canActivate: [AuthGuard],
    data: { roles: ['userTrainer'] }
  },
  {
    path: 'exercises',
    component: ExercisesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { roles: ['userTrainer'] }
  },
  {
    path: 'calculator',
    component: CalculatorComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { roles: ['userClient','userTrainer'] }
  },
  {
    path: 'trainerRegister',
    component:TrainerRegisterComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]    
  },
  {
    path: 'trainingPlan',
    component:TrainingPlanComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { roles: ['userTrainer'] }
  },
  {
    path: 'clientTrainingPlan',
    component:ClientTrainingPlanComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { roles: ['userClient'] }
  },
  {
    path: 'clientProfile',
    component:ProfileComponent,
    pathMatch: 'full',
    data: { roles: ['userClient'] }
  },
  {
    path: '**',
    redirectTo: '/', // Reemplaza con tu ruta por defecto
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
