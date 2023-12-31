import { NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './home-page/about/about.component';
import { ServicesComponent } from './home-page/services/services.component';
import { ContactComponent } from './home-page/contact/contact.component';
import { HomeComponent } from './home-page/home/home.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LandingPageClientComponent } from './landing-page-client/landing-page-client.component';
import { TrainerRegisterComponent } from './trainer-register/trainer-register.component';
import { TrainingPlanComponent } from './training-plan/training-plan.component';
import { LandingPageTrainerComponent } from './landing-page-trainer/landing-page-trainer.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { ClientTrainingPlanComponent } from './client-training-plan/client-training-plan.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    AboutComponent,
    ServicesComponent,
    ContactComponent,
    HomeComponent,
    HomePageComponent,
    LandingPageClientComponent,
    LandingPageTrainerComponent,
    TrainerRegisterComponent,
    TrainingPlanComponent,
    ExercisesComponent,
    ClientTrainingPlanComponent,
    CalculatorComponent,
    ProfileComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
