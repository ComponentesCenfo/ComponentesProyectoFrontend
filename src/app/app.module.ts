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
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TrainerRegisterComponent } from './trainer-register/trainer-register.component';
import { LandingPageTrainerComponent } from './landing-page-trainer/landing-page-trainer.component';

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
    LandingPageComponent,
    TrainerRegisterComponent,
    LandingPageTrainerComponent
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
