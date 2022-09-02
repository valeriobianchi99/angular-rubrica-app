import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UtenteComponent } from './utente/utente.component';
import { LogComponent } from './log/log.component';
import { UtenteService } from './services/utente.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { TokenInterceptor } from './token.interceptor';
import { LogsService } from './services/logs.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './services/loader.service';
import { RegisterService } from './services/register.service';
import { LoginService } from './services/login.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';





@NgModule({
  declarations: [
    AppComponent,
    UtenteComponent,
    LogComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSelectModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [UtenteService, LogsService, LoaderService, RegisterService, LoginService, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [MainComponent]
})
export class AppModule { }
