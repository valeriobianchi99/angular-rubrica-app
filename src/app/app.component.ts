import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { LoginService } from './services/login.service';
import { User } from './user.model';
import { Router } from '@angular/router';
import { LoaderService } from './services/loader.service';
import { LogoutService } from './services/logout.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  loggedUser = new User();
  cookies: string; 
  sub: Subscription;
  
  constructor(private router:Router, private loader: LoaderService, private logoutServ: LogoutService){
    //console.clear();
    this.loggedUser=JSON.parse(sessionStorage.getItem('currentLogin'));
    this.cookies = document.cookie;
  }
  
  logout():void{
    this.sub = this.logoutServ.doLogout().subscribe();
  }

  isHome():boolean{
    if(window.location.pathname=='/app') return true;
    else return false;
  }

}
